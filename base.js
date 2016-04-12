var Promise = require('bluebird')
  , co = Promise.coroutine
  , cluster = require('cluster')
  , debug = require('debug')('Global')
  , logErr = require('debug')('Err');

// middleware
const serveStatic = require('koa-static')('public');
const conditional = require('koa-conditional-get');
const bodyParser = require('koa-bodyparser')();
const Compress = require('koa-compress');
const favicon = require('koa-favicon');
const session = require('koa-session');
// const adapt = require('koa-adapter'); // adapt pre Koa 2.0 middle ware to be compatible with Koa 2.0.
const adapt = require('koa-adapter-bluebird'); // uses bluebird-co for performance
const helmet = require('koa-helmet');
const etag = require('koa-etag');

const Koa = require('koa');

const app = module.exports = new Koa();

// error handler to JSON stringify errors
const errorRes = require('./middleware/error-res');
app.use(errorRes);

const morgan = require('./middleware/morgan');
app.use(morgan);

app.use(adapt(favicon(require.resolve('./public/favicon.ico'))));
app.use(adapt(require('koa-response-time')()));
app.use(adapt(conditional()));
app.use(adapt(etag()));

app.use(adapt(Compress({
    flush: require('zlib').Z_SYNC_FLUSH
})));
app.keys = ['gf-weidian-composite'];

app.use(adapt(session({
    maxAge: 24 * 60 * 60 * 1000 // One Day
}, app)));

app.use(adapt(bodyParser));
app.use(adapt(require('koa-validate')()));

/*var json = require('koa-json');
app.use(json({ pretty: false, param: 'pretty' }));*/

import Router from 'lark-router';
const confit = require('./lib/confit');
confit.create({basedir: './config'}).then((c)=>{
  debug('confit get env:', c.get('api'));
  app.config = c;
  var router = new Router().load('controller')
  app.use(router.routes())
}, (err)=>{logErr('something is err', err)});

app.use(adapt(serveStatic));

/*
app.use(router(app, {
  root: './controller'
}))*/

const http = require('http')
const server = http.createServer(app.callback())
server.listen(process.env.PORT || 3000)
server.on('listening', () => {
    console.log('Server listening on http://localhost:%d', server.address().port);
})
export default app
