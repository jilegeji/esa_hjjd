import axios from 'axios'
import store from '../store'
import router from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'view-design'
import errorCode from '@/const/errorCode'

NProgress.configure({ showSpinner: false })

axios.defaults.timeout = 50000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * axios 请求拦截
 * 如果已经登陆成功，请求时将token带着
 */
axios.interceptors.request.use(config => {
  NProgress.start()
  if (sessionStorage.getItem('token')) {
    config.headers['token'] = sessionStorage.getItem('token');
  }
  //解决get请求缓存
  let url = config.url
  if(config.method === 'get'){
    url.indexOf('?') === -1 ? config.url = url+'?_='+(new Date().getTime()) : config.url = url+'&_='+(new Date().getTime())
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * axios 数据返回拦截
 */
axios.interceptors.response.use(data => {
  NProgress.done()
  if(data.data.code === 401){
    Message.error("登录已失效,请重新登陆!");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loginName");
    router.replace({path: '/login'})
  }
  return data.data
}, error => {
  NProgress.done()
  // 提示错误信息
  let errMsg = error.toString()
  console.error('request error:' + errMsg)
  let code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message.error(errorCode[code] || errorCode['default'])
  return Promise.reject(new Error("axios 数据返回拦截报错!"))
})

export default axios
