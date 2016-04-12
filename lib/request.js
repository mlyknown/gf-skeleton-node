/*
* @Author: gaohailang
* @Date:   2016-03-10 22:33:16
* @Last Modified by:   gaohailang
* @Last Modified time: 2016-04-12 17:44:02
*/

'use strict';
var rp = require('request-promise')
  , debug = require('debug')('Lib:request');

/* Todo: move it to utils */
/* use to format url from env var specific microservice */
String.prototype.xFormat = function(replacements) {
  return this.replace(/{(\w+)}/g, function(all, p1) {
    return replacements[p1] || p1;
  });
}

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

/*
  catch for non-200 return the error
  useful as composite service
 */
/*expo = (opt)=>{
  return _expo.call(_expo, opt).catch((err)=>{return err.error || null})
};*/

module.exports = expo;
