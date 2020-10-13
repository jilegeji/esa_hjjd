import request from '../utils/request'

const preUrl = 'http://192.168.1.52:9080'

export const loginByNameAndPassword = (username, password) => {
  return request({
    url: preUrl+'/api/back/login',
    method: 'post',
    params: { username, password}
  })
}

export const modifyPassword = (oldPassword, newPassword) => {
  return request({
    url: preUrl+'/api/back/modifyPassword',
    method: 'post',
    params: {username:sessionStorage.getItem('loginName'), oldPassword, newPassword}
  })
}