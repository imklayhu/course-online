// const mongoose = require('mongoose');
const mongoose = require('./../config');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { //用户名，自定义的，不可重复
    type: String,
    required: true,
  },
  password: String,
  name: String,  //真实姓名
  id: {  //学号
    type: String,
    required: true 
  },
  school: String, //学校
  team: String, // 班级
  college: String, // 学院
  profession: String,  //专业
  createDate: String,  // 注册时间
  token: String, //用户的登录的令牌
  type: String, // 用户类型 1:学生 2:教师
  avatar: {
    type: String,
    default: "https://i2.hdslb.com/bfs/face/0088e22e3768fc3cbd4bb18fd2d742148735ab49.jpg@72w_72h.webp"
  }, // 用户头像地址
  signature: {
    type: String,
    // default: "这家伙很懒，什么都没有"
  }, // 用户个性签名
  logined: false, //是否登录
  isCaptain: false
});

module.exports = mongoose.model('user',userSchema);