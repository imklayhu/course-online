let Router = require('koa-router')();

const sign = require('./users');

Router.use('/api',sign.routes(),sign.allowedMethods());


module.exports = Router;