import Vue from 'vue';
import Vuex from 'vuex';
// 引入本地存取值的方法
// 方法1： import { setItem, getItem } from '@/utils/stroage'

// 引入存取token的方法
import { setToken, getToken, setCityName, getCityName } from '@/utils';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 从本地取出存入的用户token
    user: getToken(),
    // 从本地取城市名
    cName: getCityName()
  },
  mutations: {
    setUser (state, data) {
      // eslint-disable-next-line no-unused-expressions
      // 设置一个容器名为user的容器，将获取到的token(data)赋值给这个容器
      state.user = data;
      // 将获取到的vuex中的user的值存入本地
      // setItem(TOKEN_KEY, state.user)
      setToken(state.user);
    },
    setCityName (state, data) {
      // eslint-disable-next-line no-unused-expressions
      // 设置一个容器名为user的容器，将获取到的token(data)赋值给这个容器
      state.cName = data;
      // 将获取到的vuex中的user的值存入本地
      // setItem(TOKEN_KEY, state.user)
      setCityName(state.cName);
    }
  },
  actions: {},
  modules: {}
});
