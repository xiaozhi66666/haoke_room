// 导入axios
import axios from 'axios'
// 导入vuex中的容器模块
import store from '@/store'

// 配置axios对象
const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 3000
})

// 在这里添加请求拦截器
// 在这里我们已经利用axios.create()配置好了一个axios对象，所以在这里必须要给这个新生成的axios对象进行配置请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // config  ==>  本次请求的配置对对象
    // console.log(config)
    // 将store中的容器user从store.state中解构出来
    const { user } = store.state
    // 添加判断，如果用户已经登录并且用户token已经保存就让其添加请求头，否则无效，截断请求
    if (user && user.token) {
      config.headers.authorization = user.token
    }
    return config
  },
  function (err) {
    // promise.rejectd（） 截断请求
    return Promise.reject(err)
  }
)

// 默认导出
export default request
