/*
* @Author: gaohailang
* @Date:   2016-03-11 11:00:33
* @Last Modified by:   gaohailang
* @Last Modified time: 2016-03-11 11:09:13
*/

'use strict';

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

module.exports = {
  isReqRight, assertPagintionQuery
};
