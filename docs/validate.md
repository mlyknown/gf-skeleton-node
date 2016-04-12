- [ ] with Mongoose as ODM and Joi as validator. - 能否把两个schema整合不用两套了
    - [ ] https://gist.github.com/stongo/6359042
    - [ ] https://github.com/yoitsro/joigoose 通过 joi 导出mongoose的schema
    - [ ] 能否koa-validate 整合应用


```js
// 关于请求的入参验证
ctx.checkQuery('query', 'Invalid query').notEmpty();
ctx.checkQuery('type', 'Invalid type').
    isIn(baseSearchTypes.concat(['all', 'stock']));
assertPagintionQuery(ctx);
if(!isReqRight(ctx)) return;


function isReqRight(ctx) {
  if(ctx.errors) {
    ctx.status = 400;
    ctx.body = {
      code: -1,
      errs: ctx.errors
    };
  }
  return !ctx.errors; // true or false
}

function assertPagintionQuery(ctx) {
  ctx.checkQuery('page', 'Invalid page').notEmpty().isInt();
  ctx.checkQuery('size', 'Invalid size').notEmpty().isInt();
}


/*
  关于数据模型的验证
  mongodb 本身是schema-less，但这并不意味着我们容忍脏数据的随意插入（只是方便我们修改和扩展数据Schema，方便业务发展）
 */

 var joiUserSchema = Joi.object({
     name: Joi.object({
         first: Joi.string().required(),
         last: Joi.string().required()
     }),
     email: Joi.string().email().required(),
     bestFriend: Joi.string().meta({ type: 'ObjectId', ref: 'User' }),
     metaInfo: Joi.any()
 });


```
