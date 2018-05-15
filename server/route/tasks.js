let router = require('koa-router')();
let taskCtrl = require('./../api/taskCtrl.js');

const routers = router
  .post('/getTasks', taskCtrl.getTasks)
  .post('/addTask',taskCtrl.addTask)
  .post('/updateTask',taskCtrl.updateTaskStatus)
  .post('/removeTask',taskCtrl.rmTask)
  .post('/findTaskById',taskCtrl.findTaskById)
  module.exports = routers;
