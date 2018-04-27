let router = require('koa-router')();
let userInfoApi = require('./../api/userInfo');
const routers = router
  .post('/login', userInfoApi.signUp)
  .post('/signin', userInfoApi.signIn)
  .get('/logout',userInfoApi.logout)
  .post('/resetpassword',userInfoApi.resetPwd)
module.exports = routers;
