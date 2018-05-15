// 任务数据表 schema
const mongoose = require('./../config.js');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  annexs: {
    type: Array,
    // required: true
  },
  classes: {
    type: Array,
    required: true
  },
  teacherId: {
    type: String,
    required: true
  },
  teacher: {
    type: Object,
    required: true
  },
  date: {
    type: Object,
    required: true
  },
  answers: [
    {
      studentInfo: {
        type: Object,
        required: true,
      },
      desc: {
        type: String,
        required: true
      },
      annexs: {
        type: Array
      }
    },
  ],
  checks: [{
    desc: {
      type: String,
      required: true
    },
    result: {
      type: String,
      required: true
    }
  }],
  // owner: {
  //   type: Object,
  //   required: true
  // },
  status: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('task', taskSchema);
