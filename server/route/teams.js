let router = require('koa-router')();
let teamCtrl = require('./../api/teamCtrl');

const routers = router
  .post('/createClass', teamCtrl.createClass)
  .post('/removeClass', teamCtrl.rmClass)
  .post('/allClasses', teamCtrl.allClasses)
module.exports = routers;
