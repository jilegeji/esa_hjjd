import request from '../utils/request'

export const loginByNameAndPassword = (username, password) => {
  return request({
    url: 'http://localhost:9080/api/back/login',
    method: 'post',
    params: { username, password}
  })
}