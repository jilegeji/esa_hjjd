import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Index.vue'
import Main from '../views/main/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'About',
     // route level code-splitting
     // this generates a separate chunk (about.[hash].js) for this route
     // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/demo/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
