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
  if (store.state.access_token) config.headers['Authorization'] = 'Bearer '

  return config
}, error => {
  return Promise.reject(error)
})

/**
 * axios 数据返回拦截
 */
axios.interceptors.response.use(data => {
  NProgress.done()
  return data.data
}, error => {
  NProgress.done()

  // 提示错误信息
  let errMsg = error.toString()
  console.error('jmonkey request error:' + errMsg)
  let code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message.error(errorCode[code] || errorCode['default'])

  // token过期或无资源权限
  if (code === '401' || code === '403') {
    // store.dispatch('LogOut').then(() => { router.replace({ path: '/login' }) })
    router.replace({path: '/403'})
  }

  return Promise.reject(new Error(error))
})

export default axios
