// const mongoose = require('mongoose');
const mongoose = require('./../config');
const Schema = mongoose.Schema;
const filesSchema = new Schema({
  originalname: {
    type: String,
    required: true,
  },
  fileFormat: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true
  },
  uploadTime: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('files',filesSchema);