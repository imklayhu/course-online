import fetch from "../../utils/fetch.js"

// 查询获取用户信息
export function getUsersInfo(obj){
  return fetch({
    url: "/api/getUsers",
    method: "post",
    data: obj
  })
}

// 创建班级
export function createClass(obj){
  return fetch({
    url: "/api/createClass",
    method: "post",
    data: obj
  })
}

// 删除班级
export function removeClass(obj){
  return fetch({
    url: "/api/removeClass",
    method: "post",
    data: obj
  })
}