let cors = require('koa-cors');

const taskModel = require("../db/model/task");

// 教师用户创建学习任务
const createTask = (data) => {
  return new Promise((reslove, reject) => {
    taskModel.create(data, (err, doc) => {
      if (err) {
        reject(err);
      }
      reslove(doc);
    })
  })
}

// 根据用户id和任务状态获取一个用户的所有任务
const getTasksByUserIdAndTaskStus = (filter) => {
  return new Promise((resolve, reject) => {
    taskModel.find(filter, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    })
  })
}

// 根据任务_id获取任务信息
const getTaskById = (filter) => {
  return new Promise((reslove, reject) => {
    taskModel.findOne(filter, (err, doc) => {
      if (err) {
        reject(err);
      }
      reslove(doc);
    })
  })
}

// 学生用户修改自己的学习任务的进度
const updateTask = (filter, updateData) => {
  return new Promise((reslove, reject) => {
    taskModel.findOneAndUpdate(filter, updateData, (err, docs) => {
      if (err) {
        reject(err);
      }
      reslove(docs);
    })
  })
}

// 教师用户删除学习任务
const removeTask = (filter) => {
  return new Promise((reslove, reject) => {
    taskModel.remove(filter, (err, doc) => {
      if (err) {
        reject(err);
      }
      reslove(doc);
    })
  })
}

module.exports = {
  // 教师用户创建学习任务
  async addTask(ctx) {
    await cors();
    let taskInfo = ctx.request.body;

    let doc = await createTask(taskInfo);
    if (doc) {
      ctx.body = {
        success: 1,
        res: doc
      };
      console.log("任务创建成功");
    } else {
      ctx.body = {
        success: 0,
        res: 0
      };
      console.log("任务创建失败");
    }
  },
  // 根据任务的_id属性查找任务信息
  async findTaskById(ctx) {
    await cors();
    let filter = ctx.request.body;

    let doc = await getTaskById(filter);

    if (doc) {
      ctx.body = {
        success: 1,
        res: doc
      }
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
    }
  },
  // 根据用户id和任务状态获取所有与之相关的学习任务信息
  async getTasks(ctx) {
    await cors();
    let body = ctx.request.body;
    // console.log(filter);
    let docs = await getTasksByUserIdAndTaskStus(body.filter);

    if (docs) {
      console.log(docs);
      if (body.data) {
        let result = [];

        docs.forEach((element) => {
          element.classes.forEach((team) => {
            team.students.forEach(stu => {
              if (stu.id == body.data.id) {
                result.push(element);
              }
            })
          })
        })

        ctx.body = {
          success: 1,
          res: result
        }
      } else {
        ctx.body = {
          success: 1,
          res: docs
        }
      }
      console.log('该用户的任务查询成功');
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
      console.log('该用户的任务查询失败');
    }
  },
  // 更新学习任务的进度
  async updateTaskStatus(ctx) {
    await cors();
    let data = ctx.request.body;
    const type = data.type;
    let filter = data.filter;
    let updateData = data.updateData;
    // 首先根据过滤器找到该任务。
    let docOri = await getTaskById(filter);
    if (type == "answer") {
      // 提交回答
      console.log(updateData)
      docOri.answers.push(updateData.answer);
      docOri.status = updateData.status
      
      let docAfter = await updateTask(filter, {
        answers: docOri.answers,
        status: docOri.status

      });
      if (docAfter) {
        ctx.body = {
          success: 1,
          res: docAfter
        }
      } else {
        ctx.body = {
          success: 0,
          res: 0
        }
      }
      
      console.log("用户回答提交成功");
    } else if (type == "check") {
      // 提交查阅结果
      docOri.checks.push(updateData.check);
      docOri.status = updateData.status;

      let docAfter = await updateTask(filter,{
        checks: docOri.checks,
        status: docOri.status
      })

      if(docAfter){
        ctx.body = {
          success: 1,
          res: docAfter
        }
      }else {
        ctx.body = {
          success: 0,
          res: 0
        }
      }
    }
  },
  // 教师用户删除学习任务
  async rmTask(ctx) {
    await cors();
    let data = ctx.request.body;

    let filter = data;
    let doc = await removeTask(filter);
    if (doc) {
      ctx.body = {
        success: 1,
        res: doc
      }
      console.log("该任务删除成功");
    } else {
      ctx.body = {
        success: 0,
        res: 0
      };
      console.log("任务删除失败");
    }
  }
}
