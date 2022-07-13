import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地存取值的方法
import { setItem, getItem } from '@/utils/stroage'
Vue.use(Vuex)

// 定义一个常量表示本地存储的key(user的token)
const TOKEN_KEY = 'TOKEN_USER'
export default new Vuex.Store({
  state: {
    // 从本地取出存入的用户token
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      // eslint-disable-next-line no-unused-expressions
      // 设置一个容器名为user的容器，将获取到的token(data)赋值给这个容器
      state.user = data
      // 将获取到的vuex中的user的值存入本地
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
