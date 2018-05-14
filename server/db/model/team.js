// 班级数据库 Schema
const mongoose = require('./../config.js');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  students: { // 学生的信息，数组，每个元素就是一条学生的具体信息
    type: Array,
    required: true
  },
  teacher: {
    type: Object,
    required: true
  },
  owner: {
    type: Object,
    required: true
  }
})

module.exports = mongoose.model('team', teamSchema);
