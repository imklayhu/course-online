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
const findUserByUsername = (username) => {
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
        console.log(`用户${userData.id}:登录成功`)
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
    let docByUsername = await findUserByUsername(query.username);
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
        // 初始化个人数据
        query.school = '';
        query.team = '';
        query.college = '';
        query.profession = '';
        query.logined = false;
        query.signature = '';
        userModel.create(query, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
      console.log(`用户${query.id}：注册成功`);
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
  // async getUserInfo(ctx){

  // },
  /**
   * 修改用户密码 api
   * @param {*} ctx 
   */
  async resetPwd(ctx) {
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
      'password': query.oldPwd
    };
    const newPwd = {
      password: query.newPwd
    }
    let doc = await updateUser(filter, newPwd);
    if (doc) {
      console.log(doc);
      ctx.body = {
        success: 1,
        res: doc
      }
    } else {
      ctx.body = {
        success: 0,
        res: 0 //失败
      }
    }
  },
  // 修改个性签名
  async updateSignature(ctx) {
    const query = ctx.request.body;
    const filter = {
      'id': query.id
    };
    const newSignature = {
      'signature': query.signature
    }

    let doc = await updateUser(filter, newSignature);
    if (doc) {
      console.log(`用户${query.id}: 个性签名修改成功`);
      ctx.body = {
        success: 1,
        res: query.signature
      }
    } else {
      console.log(`用户${query.id}: 个性签名修改失败，不存在该用户`);
      ctx.body = {
        success: 0,
        res: 0
      }
    }
  },
  // 修改 用户的 username
  async setUsername(ctx) {
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
    };
    const newUsername = {
      'username': query.username,
    };
    // let doc = await updateUser(filter, newUsername);
    // 是否已经存在该用户名的用户
    let alreadyDoc = await findUserByUsername(query.username);
    if (alreadyDoc) {
      console.log(`用户${query.id}:username修改失败，该用户名已存在`);
      ctx.body = {
        success: 0,
        res: 0
      }
    } else {
      let doc = await updateUser(filter, newUsername);
      if (doc) {
        console.log(`用户${query.id}:username修改成功`);
        ctx.body = {
          success: 1,
          res: query.username
        }
      } else {
        console.log(`用户${query.id}:username修改失败，不存在改用户名的用户`);
        ctx.body = {
          success: 0,
          res: 0
        }
      }
    }
  },
  // 修改 用户的 name
  async setName(ctx) {
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
    };
    const newName = {
      'name': query.name,
    };
    let doc = await updateUser(filter, newName);
    if (doc) {
      console.log(`用户${query.id}:name修改成功`);
      ctx.body = {
        success: 1,
        res: query.name
      }
    } else {
      console.log(`用户${query.id}:name修改失败，不存在该用户`);
      ctx.body = {
        success: 0,
        res: 0
      }
    }
  },
  // 修改 用户的 school
  async setSchool(ctx) {
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
    };
    const newSchool = {
      'name': query.school,
    };
    let doc = await updateUser(filter, newSchool);
    if (doc) {
      console.log(`用户${query.id}:school修改成功`);
      ctx.body = {
        success: 1,
        res: query.school
      }
    } else {
      console.log(`用户${query.id}:school修改失败，不存在该用户`);
      ctx.body = {
        success: 0,
        res: 0
      }
    }
  },
  // 修改用户的学院信息
  async setCollege(ctx){
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
    };
    const newCollege = {
      'college': query.college,
    };
    let doc = await updateUser(filter,newCollege);
    if(doc){
      ctx.body = {
        success: 1,
        res: query.college
      };
      console.log(`用户${query.id}:college修改成功--> ${query.college}`);
    }else {
      ctx.body = {
        success: 0,
        res: 0
      };
      console.log(`用户${query.id}:college修改失败，不存在该用户`);
    }
  },
  //修改用户的专业信息 profession
  async setProfession(ctx) {
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
    };
    const newProfession = {
      'profession': query.profession,
    };
    let doc = await updateUser(filter, newProfession);
    if (doc) {
      ctx.body = {
        success: 1,
        res: query.profession
      };
      console.log(`用户${query.id}:profession修改成功，修改为${query.profession}`)
    } else {
      ctx.body = {
        success: 0,
        res: 0
      };
      console.log(`用户${query.id}:profession修改失败，不存在该用户`)
    }
  },
  // 修改用户班级信息
  async setTeam(ctx) {
    const query = ctx.request.body;
    const filter = {
      'id': query.id,
    };
    const newTeam = {
      'team': query.team,
    };

    let doc = await updateUser(filter,newTeam);

    if(doc){
      ctx.body = {
        success: 1,
        res: query.team
      };
      console.log(`用户${query.id}: team 修改成功，team为${query.team}`);
    }else{
      ctx.body = {
        success: 0,
        res: 0
      };
      console.log(`用户${query.id}:team修改失败，不存在该用户`);
    }
  },
  // 修改用户的id 信息
  // async setId(ctx) {
  //   const query = ctx.request.body;

  //   const filter = {
  //     'id': query.id,
  //   };
  //   const newId = {
  //     'id': query.newId
  //   }
  // }
}
