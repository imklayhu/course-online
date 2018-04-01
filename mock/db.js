// db.js mock server的数据源
var Mock = require('mockjs');

module.exports = {
  getComment: Mock.mock({
    "error":0,
    "message":"success",
    "result|40":[{
      "author": "@name(2,3)",
      "comment": "@cparagraph",
      "date":"@datetime"
    }]
  }),
  addComment: Mock.mock({
    "error":0,
    "message": "success",
    "result":[]
  }),
  getJson: Mock.mock({
    "data": [{
      "id": "@Random.increment()",
      "name": "@name(2,3)",
      "comment": "@cparagraph",
      "date":"@datetime"
    }]
  })
};