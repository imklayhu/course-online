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
  owner: {
    type: Object,
    required: true
  },
  like: {
    type: Number,
  },
  unlike: {
    type: Number,
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