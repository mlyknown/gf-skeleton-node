
我们的web应用接受请求，也发送请求。 我们需要对这些请求进行记录和追踪，这样才能对一些用户的具体操作进行trakc甚至replay来辅助我们debug用户的线上问题，对我们依赖的外部微服务的状态和返回数据进行审视和使用杜绝可能存在的外部broken或者不符合预期的返回搞挂我们的应用。

## 基于morgan 对请求的track

如默认的morgain支持一些预设计的format，但是发现不能满足我们的一些需求：

- 如日期不够直观
- 如希望打印出gfUid 信息（cookie 通过我们前置的nginx & openresty lua脚本替换为广发通id)
- 如对一些信息的关注（如状态码，请求响应时间等

```js
var Morgan = require('koa-morgan'), logger;

// https://github.com/expressjs/morgan
Morgan.token('gfUid', (req, res)=> req.headers['UserId']);
logger = Morgan(':remote-addr [:date[iso]] ":method :url" :status :res[content-length] :response-time ms gfUid: :gfUid ":referrer" ":user-agent"');
// const logger = Morgan('combined');

module.exports = logger;
```

## 基于request-debug 对于外部接口的track

request 这个类库本身已是用tj的debug模块来debug的，所以在开发的时候可以开启（）但是过于verbose，我们可以利用request-debug来定制化实现我们的追踪工作（该类库重写了request方法，在请求生命周期的多个hook点emit出事件出来。

```js
require('request-debug')(rp, function(type, data, r) {
  // put your request or response handling logic here
  // Todo: request-post data lost? response json.stringify broken?
  //console.log(type, data, r);
  if(type === 'request') {
    var {debugId, uri, method, body} = data;
    var userId = data.headers.userId;
    var more = body ? '' : ('-'+body) + userId ? '' : ('userId:'+userId);
    debug(`${debugId}-${method}-${uri}` + more);
  }

  if(type === 'response') {
    //console.log('repsonse:', data);
    var {debugId, statusCode, body} = data;
    debug(`${debugId}-response-${statusCode}-`+JSON.stringify(body).slice(0, 155));
  }
});
```