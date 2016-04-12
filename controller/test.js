const Promise = require('bluebird');

export default router => {
  router.get('/', async (ctx, next) => {
    ctx.body = 'GET /xxxx';
  });

  router.get('/new', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Hello world from worker '
  });

  router.get('/api/delay', async (ctx, next) => {
    await Promise.delay(3000);
    ctx.body = "Simple Async 3-second Delayed Example!";
  });

  router.get('/api/error', (ctx, next) => {
    // Example showing error throwing
    throw new Error('Hurr durr!');
  });

  router.post('/:foo/:bar', async (ctx, next) => {
    // handle requests on GET /hello/world/:foo/:bar
    console.log('get req.params:', ctx.params);
    console.log('get req query:', ctx.query); // ctx.request
    console.log('get header userId:', ctx.get('userId'));
    console.log('get req body:', ctx.request.body);
    ctx.body = 'POST /';
  });
}

// microservice-style
/*var _ = require('lodash')
  , rp = require('../lib/request')
  , debug = require('debug')('Ctrl:Info')
  , validator = require('../lib/validate');

var {assertPagintionQuery, isReqRight} = validator;

export default router => {
  var apiConf = require('../base').config.get('api');
  var {stockPortfolioExpert, stockPortfolioExperting,
    stockPortfolioSelfMaster} = apiConf;

  router.get('/master/isempty', async (ctx, next)=>{
    // var id = ctx.params.id
    ctx.checkQuery('tradingcode', 'Invalid tcode').notEmpty();
    ctx.checkQuery('exchangecode', 'Invalid ecode').notEmpty();
    // assertPagintionQuery(ctx);
    if(!isReqRight(ctx)) return;

    var {tradingcode, exchangecode} = ctx.request.query;
    var page = 1, limit = 1;

    var [r1, r2, r3] = await Promise.all(_.map([
      {url: stockPortfolioExpert.xFormat({exchangecode, tradingcode}), qs: {page, limit}},
      {url: stockPortfolioExperting.xFormat({exchangecode, tradingcode}), qs: {page, limit}},
      {url: stockPortfolioSelfMaster, qs: {page, limit, exchangecode, tradingcode}}
    ], (opt)=>{return rp(opt)})); //

    ctx.body = [r1.total, r2.total, r3.page.total];
  });
};*/


// ejs example
/*const render = require('koa-ejs')
const path = require('path')

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
})*/
