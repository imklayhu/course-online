// 小组数据 schema
const mongoose = require('./../config.js');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    required: true
  },
  team: {
    type: Object,
    required: true
  },
})