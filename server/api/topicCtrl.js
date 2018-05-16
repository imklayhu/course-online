let cors = require('koa-cors');

const topicModel = require("../db/model/topics");

/**
 * 话题的增删查改
 */

//  创建新的话题
const createTopic = (data) => {
  return new Promise((reslove, reject) => {
    topicModel.create(data, (err, doc) => {
      if (err) {
        reject(err);
      }
      reslove(doc);
    })
  })
}
// 修改话题信息： 点赞点踩，评论以评论回复
const updateTopic = (filter, data) => {
  return new Promise((reslove, reject) => {
    // 
    topicModel.findByIdAndUpdate(filter, data, (err, doc) => {
      if (err) {
        reject(err);
      }
      reslove(doc);
    })
  })
}

// 根据标题内容查找topics
const findTopicsByTitle = (filter) => {
  return new Promise((reslove, reject) => {
    topicModel.find(filter, (err, docs) => {
      if (err) {
        reject(err);
      }
      reslove(docs);
    })
  })
}
//  获取topic的总页数
const getTotal = (filter) => {
  return new Promise((reslove, reject) => {
    topicModel.count(filter,  (err, total) => {
      if (err) {
        reject(err);
      }
      reslove(total);
    })
  })
}
// 分页查询topics
const findTopicsByPages = (data) => {
  return new Promise((reslove, reject) => {
    // topicModel.find({},(err,doc));
    const pagesize = 20;
    let page = data.page - 1;
    // const total = 0;
    topicModel.find({})
      .limit(pagesize)
      .skip(page * pagesize)
      .sort({'_id':-1})
      .exec((err, docs) => {
        if (err) {
          reject(err);
        }
        reslove(docs);
      })
  })
}

// 删除话题
const removeTopic = (filter) => {
  return new Promise((reslove, reject) => {
    topicModel.remove(filter, (err, doc) => {
      if (err) {
        reject(err);
      }
      reslove(doc);
    })
  })
}

module.exports = {
  // 创建话题
  async addTopic(ctx) {
    await cors();
    let data = ctx.request.body;
    let doc = await createTopic(data);

    if (doc) {
      ctx.body = {
        success: 1,
        res: doc
      };
      console.log("新话题创建成功")
    } else {
      ctx.body = {
        success: 0,
        res: 0
      };
      console.log("新话题创建失败")
    }
  },
  // 删除话题
  async deleteTopic(ctx) {
    await cors();
    let filter = ctx.request.body;

    let doc = await removeTopic(filter);
    if (doc) {
      ctx.body = {
        success: 1,
        res: doc
      };

      console.log("话题删除成功");
    } else {
      ctx.body = {
        success: 0,
        res: 0
      };

      console.log("话题删除失败");
    }
  },
  // 修改话题元数据
  async reeditTopic(ctx) {
    await cors();
    let data = ctx.request.body;
    let filter = data.filter;
    let updateDate = data.updateDate;
    let doc = await updateTopic(filter, updateDate);

    if (doc) {
      ctx.body = {
        success: 1,
        res: doc
      }
      console.log("元数据修改成功");
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
      console.log("元数据修改失败");
    }
  },
  //  获取帖子的总数和页数
  async getTopicsCount(ctx) {
    await cors();
    let filter = ctx.request.body;
    let total = await getTotal(filter);
    if (total > 0) {
      let pageCount = total / 20;

      ctx.body = {
        success: 1,
        res: {
          pageCount,
          total,
        }
      }
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
    }
  },
  // 分页获取数据
  async getTopicsByPage(ctx) {
    await cors();
    let data = ctx.request.body;

    let total = await getTotal({});
    let docs = await findTopicsByPages(data);

    if (docs) {
      ctx.body = {
        success: 1,
        res: docs,
        total: total
      };

      console.log(`第${data.page}页数据查询成功`);
    } else {
      ctx.body = {
        success: 0,
        res: 0,
        total: 0
      }
    }
  },
  // 点赞api
  async addLike(ctx) {
    await cors();
    let data = ctx.request.body;
    let filter = data.filter;
    let updateData = data.updateData;
    console.log(data)
    let doc = await updateTopic(filter, updateData);
    console.log(doc)
    if (doc) {
      ctx.body = {
        success: 1,
        res: updateData.like
      }
      console.log("点赞");
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
      console.log("点赞失败");
    }
  },
  // 点踩
  async addUnlike(ctx) {
    await cors();
    let data = ctx.request.body;
    let filter = data.filter;
    let updateData = data.updateData;
    let doc = await updateTopic(filter, updateData);

    if (doc) {
      ctx.body = {
        success: 1,
        res: updateData.unlike
      }
      console.log("点踩");
    } else {
      ctx.body = {
        success: 0,
        res: 0
      }
      console.log("点踩失败");
    }
  },
  // 添加评论
  async addComment(ctx) {

  },
  // 删除评论
  async deleteComment(ctx) {

  },
  // 添加评论回复
  async addCommentReply(ctx) {

  },
  // 删除评论回复
  async deleteCommentReply(ctx) {

  },
  // 添加回复的回复
  async addReply2Reply(ctx) {

  },
  // 删除回复的回复
  async deleteReply2Reply(ctx) {

  }
}
