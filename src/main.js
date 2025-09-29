import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import apiService from './services'

// 引入全局样式
import '@/styles/global.scss'

Vue.config.productionTip = false

// 使用 Element UI
Vue.use(ElementUI, {
  size: 'medium'
})

// 使用 API 服务
Vue.use(apiService)

// 注册全局过滤器
Vue.filter('formatDate', function(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('zh-CN')
})

Vue.filter('formatTime', function(value) {
  if (!value) return ''
  return new Date(value).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')