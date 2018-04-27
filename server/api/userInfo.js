let cors = require('koa-cors');
const moment = require('moment');
const userModel = require('../db/model/user')

// 查找用户id是否重复
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    // console.log({username,id})
    userModel.findOne({
      id
    }, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    })
  })
}
// 查找用户名 username 是否重复
const findUserByUsernam = (username) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({
      username
    }, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    })
  })
}

// update user's some key word value
const updateUser = (filter, updateData) => {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(filter, updateData, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })
}

module.exports = {
  async signUp(ctx) {
    // 登录要进行的判断和操作
    await cors();
    const userData = ctx.request.body;
    // console.log(userModel)
    let user = await findUserById(userData.id);
    if (user) {
      if (user.password === userData.password) {
        ctx.body = {
          success: 1, //存在该用户
          res: user //该id存在且密码正确，登录成功，返回这个用户的数据
        }
      } else {
        ctx.body = {
          success: 1, //存在该用户
          res: -1 // 存在该id但是密码不正确，返回-1提示用户密码不正确
        }
      }
    } else {
      ctx.body = {
        success: 0, //不存在该用户
        res: 0 //不存在该用户，提示去注册。
      }
    }
  },
  /**
   * 注册 api
   * @param {*} ctx 
   */
  async signIn(ctx) {
    // 注册需要的判断和操作
    await cors();
    const query = ctx.request.body;
    query.createDate = moment(new Date(), 'YYYY-MM-DD');
    console.log(query);
    let docByid = await findUserById(query.id);
    let docByUsername = await findUserByUsernam(query.username);
    // console.log('----doc-----');
    // console.log(doc);
    if (docByid || docByUsername) {
      console.log('用户已存在');
      if (docByid) {
        ctx.body = {
          success: 0,
          data: "-1" //该学号/工号已注册
        };
      }
      if (docByUsername) {
        ctx.body = {
          success: 0,
          data: "-2" //该用户名已被占用
        };
      }
    } else {
      await new Promise((resolve, reject) => {
        userModel.create(query, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
      console.log('注册成功');
      ctx.body = {
        success: 1,
        data: "注册成功"
      }
    }
  },
  /**
   * 退出登录api
   * @param {*} ctx 
   */
  async logout(ctx) {
    const id = ctx.request.query.id;
    let user = await updateUser({
      'id': id
    }, {
      'logined': false
    });
    if (user) {
      ctx.body = {
        success: 1,
        res: 1
      }
      console.log(`用户${id}:退出登录`);
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
    }
  },
  /**
   * 修改用户密码 api
   * @param {*} ctx 
   */
  async resetPwd(ctx){
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
      'password': query.oldPwd
    };
    const newPwd = {
      password: query.newPwd
    }
    let doc = await updateUser(filter,newPwd);
    if(doc){
      console.log(doc);
      ctx.body = {
        success: 1,
        res: doc
      }
    }else{
      ctx.body = {
        success: 0,
        res: 0 //失败
      }
    }
  }
}
