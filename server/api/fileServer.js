let cors = require('koa-cors');
const moment = require('moment');
const multer = require('koa-multer');
const userModel = require('../db/model/files.js');
//上传配置  
const storage = multer.diskStorage({
  //文件保存路径  
  destination: function (req, file, cb) {
    cb(null, 'public/documents/')
  },
  //修改文件名称  
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
const limits = {
  fieldSize: '2MB',
  files: 5
}
module.exports = {

}
