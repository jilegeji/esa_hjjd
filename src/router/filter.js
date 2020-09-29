import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

/**
 * router before
 * TODO 在系统中禁用了 router history
 */
router.beforeEach((to, from, next) => {
  console.log("当前token为："+sessionStorage.getItem('token'))
  NProgress.start()
  if (sessionStorage.getItem('token')) {
    if (to.path === '/login') {
        next({ path: '/', replace: true })
    }else{
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', replace: true })
    }
  }
})

/**
 * router after
 */
router.afterEach((to, from) => {
  // 如果用户在浏览器地址栏中随意输入地址，回到当前页
  // TODO 改进方案： 在state.common.menuList中不存在该路径,回到当前页
  // TODO 存在问题： this.$router.replace({path: '/message/publish/form'}) 时, 不能跳转页面, 改进：能遍历state.common.menuList,
  /* if (whiteList.indexOf(to.path) === -1 && to.path !== store.getters.currentMenu) {
    router.replace(store.getters.currentMenu)
  } */
  if (to.matched.length === 0) { // 如果未匹配到路由,跳到404页面
    router.replace({path: '/404'})
  }

  NProgress.done()
})
