import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: { title: 'Hilton Restaurant - Online Booking' }
    },
    {
      path: '/staff/login',
      name: 'StaffLogin',
      component: () => import('@/views/staff/Login.vue'),
      meta: { title: 'Staff Login', guest: true }
    },
    {
      path: '/staff/dashboard',
      name: 'StaffDashboard',
      component: () => import('@/views/staff/Dashboard.vue'),
      meta: { title: 'Staff Dashboard', requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 初始化认证状态
  if (!store.state.auth.initialized) {
    store.dispatch('auth/initializeAuth')
  }
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // 检查是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next('/staff/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters['auth/isAuthenticated']) {
      next('/staff/dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router