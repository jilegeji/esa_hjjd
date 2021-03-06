import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Index.vue'
import Main from '../views/main/Index.vue'
import AccountList from '../views/main/AccountList.vue'
import AccountDetail from '../views/main/AccountDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      // {
      //   path: '',
      //   redirect: 'accountList'
      // },
      {
        path: 'accountList',
        name: 'AccountList',
        component: AccountList,
        meta: {keepAlive: true}
      },
      {
        path: 'accountDetail',
        name: 'AccountDetail',
        component: AccountDetail,
        meta: {keepAlive: false}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
