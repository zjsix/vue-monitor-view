
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/layout/index.vue'

import store from '../store'
// 路由导航冗余报错（菜单路由重复点击）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    redirect: '/index/list',
    component: Index,
    children: [
      {
        path: 'list',
        component: () => import('@/views/index/list.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/index/user.vue')
      },
      
      {
        path: 'changePassword',
        component: () => import('@/views/index/changePassword.vue')
      },
    ]
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.path == '/login' || to.path == '/') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      if (!store.getters.username) {
        await store.dispatch('getInfo')
      }
      next()
    } else {
      next('/login')
    }

  }
})

export default router
