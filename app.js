const Koa = require('koa');
let Router = require('koa-router');
let Cors = require('koa-cors');

const app = new Koa();
const router = new Router();

router.get('/getJson',async ctx=>{
  await Cors();
  ctx.body = "hello world";
})
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);