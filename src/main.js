import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入amfe-flexible 模块随屏幕大小设置动态根字号
import 'amfe-flexible'
// 引入iconfont.css
import '@/assets/fonts/iconfont.css'
// 全局引入vant组件库
import Vant from 'vant'

import 'vant/lib/index.css'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
