// 班级数据库 Schema
const mongoose = require('./../config.js');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  _id: {
    type: String,
    required: true,
    // unique: true
  },
  name:{
    type: String,
    required: true
  },
  captain_id: { //学习委员或者班长的信息
    type: String,
    required: true
  },
  students: { // 学生的信息，数组，每个元素就是一条学生的id
    type: Array,
    required: true
  },
  teachers: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('team',teamSchema);