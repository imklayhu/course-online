let Router = require('koa-router')();

const sign = require('./users');
const team = require('./teams');
const task = require('./tasks');
const topic = require('./topics')

Router.use('/api',sign.routes(),sign.allowedMethods());
Router.use('/api',team.routes(),team.allowedMethods());
Router.use('/api',task.routes(),task.allowedMethods());
Router.use('/api',topic.routes(),topic.allowedMethods());
// console.log(Router)
module.exports = Router;