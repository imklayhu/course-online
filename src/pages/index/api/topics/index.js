import fetch from "../../utils/fetch.js"

// 新建话题
export function createTopic(obj){
  return fetch({
    url: '/api/addTopic',
    method: 'post',
    data: obj
  })
}

// 删除话题
export function deleteTopic(obj){
  return fetch({
    url: '/api/deleteTopic',
    method: 'post',
    data: obj
  })
}
// 修改话题元数据
export function reeditTopic(obj){
  return fetch({
    url: '/api/addTopic',
    method: 'post',
    data: obj
  })
}
// 获取帖子页数和总数
export function getTopicsCount(obj){
  return fetch({
    url: '/api/getTopicsCount',
    method: 'post',
    data: obj
  })
}
// 根据id获取topic详情
export function getTopicDetail(obj){
  return fetch({
    url: '/api/getOneTopicById',
    method: 'post',
    data: obj
  })
}
// 分页获取话题列表
export function getTopicsRow(obj){
  return fetch({
    url: '/api/getTopicsByPage',
    method: 'post',
    data: obj
  })
}

// 点赞
export function addLike(obj){
  return fetch({
    url: "/api/addLike",
    method: 'post',
    data: obj
  })
}

// 点踩
export function addUnlike(obj){
  return fetch({
    url: "/api/addUnlike",
    method: 'post',
    data: obj
  })
}

// 评论及回复api
export function addComment(obj){
  return fetch({
    url: "/api/addComment",
    method: "post",
    data: obj
  })
}

export function addReply(obj){
  return fetch({
    url: "/api/addReply",
    method: "post",
    data: obj
  })
}