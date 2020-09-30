import request from '../utils/request'

export const loginByNameAndPassword = (username, password) => {
  return request({
    url: 'http://localhost:9080/api/back/login',
    method: 'post',
    params: { username, password}
  })
}

export const modifyPassword = (oldPassword, newPassword) => {
  return request({
    url: 'http://localhost:9080/api/back/modifyPassword',
    method: 'post',
    params: {username:sessionStorage.getItem('loginName'), oldPassword, newPassword}
  })
}