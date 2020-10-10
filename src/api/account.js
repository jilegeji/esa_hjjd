import request from '../utils/request'

export const insertAccount = (params) => {
  return request({
    url: 'http://localhost:9080/api/account/insertAccount',
    method: 'post',
    params: params
  })
}

export const listAccount = (query) => {
  return request({
    url: 'http://localhost:9080/api/account/list',
    method: 'get',
    params: query
  })
}

export const modifyAccount = (params) => {
  return request({
    url: 'http://localhost:9080/api/account/modify',
    method: 'post',
    params: params
  })
}

export const delAccount = (cardNo) => {
  return request({
    url: 'http://localhost:9080/api/account/delete/' + cardNo,
    method: 'delete'
  })
}