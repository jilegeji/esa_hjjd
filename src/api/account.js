import request from '../utils/request'

// const preUrl = 'http://192.168.1.52:9080'
const preUrl = 'http://localhost:9080'

export const insertAccount = (params) => {
  return request({
    url: preUrl+'/api/account/insertAccount',
    method: 'post',
    params: params
  })
}

export const listAccount = (query) => {
  return request({
    url: preUrl+'/api/account/list',
    method: 'get',
    params: query
  })
}

export const modifyAccount = (params) => {
  return request({
    url: preUrl+'/api/account/modify',
    method: 'post',
    params: params
  })
}

export const delAccount = (cardNo) => {
  return request({
    url: preUrl+'/api/account/delete/' + cardNo,
    method: 'delete'
  })
}

export const getBoxPlotData = (cardNo) => {
  return request({
    url: preUrl+'/api/back/getBoxPlotData',
    method: 'post',
    params: {"cardNo":cardNo}
  })
}