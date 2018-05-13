let cors = require('koa-cors');
const moment = require('moment');
const teamModel = require('../db/model/team');
// 搜索班级的数量，来确定班级的_id
const getAllClasses = () => {
  return new Promise((resolve, reject) => {
    teamModel.find({}, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    })
  })
}
// 创建新的班级数据库操作
const addClass = (classData) => {
  let id = getAllClasses().length++;
  let query = {
    "_id": id,
    "name": classData.name,
    "captain_id": classData.captain_id,
    "students": classData.students,
    "teachers": classData.teachers,
  };
  return new Promise((reslove, reject) => {
    teamModel.create(query, (err, result) => {
      if (err) {
        reject(err);
      }
      // reslove();
      reslove(result);
    })
  })
}

const removeClass = (classData) => {
  return new Promise((reslove, reject) => {
    teamModel.findOneAndRemove(classData, (err, doc) => {
      if (err) {
        reject(err);
      }
      reslove(doc);
    })
  })
}

module.exports = {
  // 创建新的班级
  async createClass(ctx) {
    await cors();
    const classData = ctx.request.body;
    let doc = await addClass(classData);
    if (doc) {
      console.log(doc);
      ctx.body = {
        success: 1,
        res: doc
      };
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
    }
  },
  // 删除班级
  async rmClass(ctx) {
    await cors();
    const classId = ctx.request.body;
    let doc = await removeClass(classId);

    if (doc) {
      ctx.body = {
        success: 1,
        res: 1
      };
    } else {
      ctx.body = {
        success: 0,
        res: 0
      };
    }
  },

  // 获取全部班级
  async allClasses(ctx){
    await cors();
    
    let classes = await getAllClasses();
  }
}
