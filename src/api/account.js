import request from '../utils/request'

export const insertAccount = (params) => {
  return request({
    url: 'http://localhost:9080/api/account/insertAccount',
    method: 'post',
    params: params
  })
}