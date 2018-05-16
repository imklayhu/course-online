// 论坛话题 schema
const mongoose = require('./../config');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  theme: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  createDate: {
    type: String,
    required: true
  },
  pagehost: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  unlike: {
    type: Number,
    default: 0
  },
  comments: [{
    username: {
      type: String,
      required: true
    },
    conetnt: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  }],
  commentCount: {
    type: String,
    default: 0
  },
  commentReplys: [{
    username: {
      type: String,
      required: true
    },
    commentId: {
      type: String,
      required: true,
    },
    commentUsername: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  }],
  replyReplys: [{
    username: {
      type: String,
      required: true
    },
    replyId: {
      type: String,
      required: true,
    },
    replyUsername: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  }]
})

module.exports = mongoose.model('topic',topicSchema);