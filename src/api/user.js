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
 *
 * @param {Object} data 包含一些设置用户信息的数据的对象
 * "avatar": "",
  "gender": "",
  "nickname": "",
  "phone": ""
 * @returns Promise
 */
export const goEditUserInfoAPI = (data) => request({
  url: '/user',
  method: 'PATCH',
  data
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

/**
 * 发布房源
 * @param {Object} data  //包含房源详细信息的对象集合
 * {
  "title": "整租 · 豪华小区 精装修出租 小区环境幽静",
  "description": "【装修描述】 装修简洁，家电配齐，通风采光效果良好，格局方正。",
  "houseImg": "img1|im2|img3",
  "oriented": "ORIEN|caa6f80b-b764-c2df",
  "supporting": "空调|洗衣机",
  "price": "1234",
  "roomType": "ROOM|ce2a5daa-811d-2f49",
  "size": "123",
  "floor": "FLOOR|1",
  "community": "AREA|93cbbe43-741d-de54"
}
 * @returns Promise
 */
export const publishHouseInfoAPI = (data) => request({
  url: '/user/houses',
  method: 'POST',
  data

})

/**
 * 查看房屋是否被收藏
 * @param {String} code
 * @returns Promise
 */
export const checkCollectAPI = (code) => request({
  url: `user/favorites/${code}`,
  method: 'GET'
})

/**
 * 添加房屋收藏
 * @param {String} code
 * @returns Promise
 */
export const addCollectAPI = (code) => request({
  url: `user/favorites/${code}`,
  method: 'POST'
})

/**
 * 删除房屋收藏
 * @param {String} code
 * @returns Promise
 */
export const delCollectAPI = (code) => request({
  url: `user/favorites/${code}`,
  method: 'DELETE'
})
