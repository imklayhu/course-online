// server.js文件

let Koa = require('koa');
// let Router = require('koa-router');
let routers = require('./route/index');
const mongoose = require('mongoose');
const Schema = require('./db/config');
const convert = require('koa-convert');
let cors = require('koa-cors');
// 引入modejs的文件系统API
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
