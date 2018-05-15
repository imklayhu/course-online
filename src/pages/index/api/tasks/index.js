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
// 获取全部班级
export function getAllClasses(){
  return fetch({
    url: "/api/allClasses",
    method: "post",
    // data: obj
  })
}

// 获取学习任务
export function getTasks(obj){
  return fetch({
    url: "/api/getTasks",
    method: "post",
    data: obj
  })
} 
// 根据徐熙任务的_id获取该任务的全部信息
export function findTaskById(obj){
  return fetch({
    url: '/api/findTaskById',
    method: "post",
    data: obj
  })
}

// 创建学习任务
export function addTask(obj){
  return fetch({
    url: "/api/addTask",
    method: "post",
    data: obj
  })
} 

// 更新学习任务的状态
export function updateTaskStatus(obj){
  return fetch({
    url: "/api/updateTask",
    method: "post",
    data: obj
  })
}

// 删除学习任务
export function removeTask(obj){
  return fetch({
    url: "/api/removeTask",
    method: "post",
    data: obj
  })
} 