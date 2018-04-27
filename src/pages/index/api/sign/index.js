import fetch from "../../utils/fetch.js"
// import axios from 'axios';
/**
 * 
 * @param {*登录需要的数据} obj 
 */
export function signUp(obj){
  // console.log('test fetch')
  return fetch({
    url: "/api/login",
    method: 'post',
    data: obj
  })
}
/**
 * 注册需要的数据
 */
export function signIn(obj){
  // axios.post('/api/signin',obj)
  return fetch({
    url: '/api/signin',
    method: 'post',
    data: obj
  })
}
/**
 * 退出登录
 */
export function logout(id){
  return fetch({
    url: `/api/logout?id=${id}`,
    method: 'get'
  })
}
