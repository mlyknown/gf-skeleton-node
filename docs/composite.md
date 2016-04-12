
关于接口聚合
很多场景下，node 作为接入层需要把更后端的微服务提供的原子化的接口作特定用户场景下的包装。这样就需要我们对于各个接口实现高效的整合和统一的处理，甚至追踪。

由于我们使用了koa2，即 async function中的 await 关键字要默认使用的promise类型，代表要等待的请求响应数据。所以我们使用[request-promise](https://www.npmjs.com/package/request-promise)来替换包装原来的callback-based的request类库，作为我们基础的请求类库

同理，对于聚合层，需要部分接口private走授权，部分接口是public. 所以在nginx要如下配置：

```json
location ~* /composite/.*/opt-auth/ {
  proxy_set_header X-Real-IP $remote_addr;
  rewrite /composite/(.*) /$1 break;
  access_by_lua_file /usr/local/openresty/auth_lua/buyer_get_user.lua;
  set $args $args&serviceName=search&serviceVersion=1.0.0&serviceNamespace=microshop&eagleToken=[EAGLE_TOKEN];
  proxy_pass http://eagle_servers;
}
```

```js
// 需要注意的是，对于request-promise 在非200等情况下的throw error，但是对于聚合逻辑，单一的接口的出错不应该直接跳转到catch的处理中。

var [r1, r2] = await Promise.all(_.map([
  {url: stockPortfolioExperting.xFormat({exchangecode, tradingcode}), qs: {page, limit}},
  {url: stockPortfolioSelfMaster, qs: {page, limit, exchangecode, tradingcode}}
], (opt)=>{return rp(opt)}));

ctx.body = [r1.total, r2.page.total];

var _expo = rp.defaults({
  json: true,
  timeout: 10000,
  transform: (body)=>{
    if(body.data && (body.code === 'SUCCESS')) {
      return body.data;
    }
    return body;
  }
}), expo;

// default catch for non-200 return the error
expo = (opt)=>{
  return _expo.call(_expo, opt).catch((err)=>{return err.error || null})
};



```



