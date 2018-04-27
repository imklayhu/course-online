import fetch from "../../utils/fetch.js"
// 修改用户密码的api
export function resetPwd(obj){
  // console.log('test fetch')
  return fetch({
    url: "/api/resetpassword",
    method: 'post',
    data: obj
  })
}