let Router = require('koa-router')();

const sign = require('./users');
const team = require('./teams');

Router.use('/api',sign.routes(),sign.allowedMethods());
Router.use('/api',team.routes(),team.allowedMethods());
console.log(Router)
module.exports = Router;