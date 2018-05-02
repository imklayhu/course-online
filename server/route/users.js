let router = require('koa-router')();
let userInfoApi = require('./../api/userInfo');
const routers = router
  .post('/login', userInfoApi.signUp)
  .post('/signin', userInfoApi.signIn)
  .get('/logout',userInfoApi.logout)
  .post('/resetpassword',userInfoApi.resetPwd)
  .post('/setSignture',userInfoApi.updateSignature) // 修改个性签名
  .post('/setUsername',userInfoApi.setUsername)  // 修改用户名
  .post('/setName',userInfoApi.setName)
  .post('/setSchool',userInfoApi.setSchool)
  .post('/setCollege',userInfoApi.setCollege)
  .post('/setProfession',userInfoApi.setProfession)
  .post('/setTeam',userInfoApi.setTeam)
module.exports = routers;
