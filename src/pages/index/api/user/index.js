import fetch from "../../utils/fetch.js"
// 修改用户密码的api
export function resetPwd(obj) {
  // console.log('test fetch')
  return fetch({
    url: "/api/resetpassword",
    method: 'post',
    data: obj
  })
}
// 修改用户的个性签名
export function setSignature(obj) {
  return fetch({
    url: "/api/setSignture",
    method: 'post',
    data: obj
  })
}
// 修改用户名
export function setUsername(obj) {
  return fetch({
    url: "/api/setUsername",
    method: 'post',
    data: obj
  })
}

// 修改用户姓名
export function setName(obj) {
  return fetch({
    url: "/api/setName",
    method: 'post',
    data: obj
  })
}

// 修改用户学校信息
export function setSchool(obj) {
  return fetch({
    url: '/api/setSchool',
    method: 'post',
    data: obj
  })
}

//修改用户学院信息
export function setCollege(obj) {
  return fetch({
    url: '/api/setCollege',
    method: 'post',
    data: obj
  })
}
// 修改用户专业信息
export function setProfession(obj) {
  return fetch({
    url: '/api/setProfession',
    method: 'post',
    data: obj
  })
}

// 修改用户班级信息
export function setTeam(obj) {
  return fetch({
    url: '/api/setTeam',
    method: 'post',
    data: obj
  })
}

// 获取所有的用户信息
export function getUsersInfo(obj) {
  return fetch({
    url: "/api/getUsers",
    method: "post",
    data: obj
  })
}
