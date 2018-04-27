const mongoose = require('mongoose')
mongoose.connect('mongodb://huyong:huyong@127.0.0.1:27017/courseonline')
const db = mongoose.connection;
mongoose.Promise = global.Promise
// const Schema = mongoose.Schema
db.on('error', function(){
  console.log('数据库连接出错！');
});
db.on('open', function(){
  console.log('数据库连接成功！');
});

module.exports = mongoose;