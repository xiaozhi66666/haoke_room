// 导入request
import request from '@/utils/request'

// 配置用户登录请求
/**
 * @param {Object} data 用户账号密码信息
 * @returns token
 */
export const getLoginAPI = (data) => request({
  method: 'POST',
  url: '/user/login',
  data
})
// 配置获取用户信息的请求
/**
 * @returns 用户个人信息
 */
export const getUserInfo = () => request({
  method: 'GET',
  url: '/user'
  // 注意看接口文档必须携带请求头信息，去接口处设置
  // headers: {
  //     // 在设置具体请求方式的时候，在里面加入headers:{}可设置具体请求头信息！！！
  //     // 注意仔细看接口文档Bearer+空格+用户token
  //     Authorization: `Bearer ${store.state.user.token}`, //===> 容器模块下 => 具体容器名 ==> 存储对象 ==> 存储对象中存储的属性名 （token/refreshToken）
  // },
})

/**
 * 获取用户收藏列表
 * @returns Promise
 */
export const getUserCollectAPI = () => request({
  url: '/user/favorites'
})

/**
 * 获取用户已发布房源信息列表
 * @returns Promise
 */
export const getUserRentAPI = () => request({
  url: '/user/houses'
})
