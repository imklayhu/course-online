// server.js文件

let Koa = require('koa');
// let Router = require('koa-router');
let routers = require('./route/index');
const mongoose = require('mongoose');
const Schema = require('./db/config');
const convert = require('koa-convert');
let cors = require('koa-cors');
// 引入上传文件的中间件
const multer = require('koa-multer');
const static = require('koa-static');

// 文件上传配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/documents/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null,file.originalname + "." + fileFormat[fileFormat.length - 1]);
  }
})

// 引入nodejs的文件系统API
let fs = require('fs');
// let bodyParser
const bodyparser = require('koa-bodyparser');

const app = new Koa();

app.convert = x => app.use.call(app, convert(x));

app.convert(bodyparser());
// const router = new Router();
const port = 3000;
// 监听3000端口
app.use(routers.routes()).use(routers.allowedMethods())
console.log(`Koa server is starting at http://localhost:${port}`);
app.listen(port);
