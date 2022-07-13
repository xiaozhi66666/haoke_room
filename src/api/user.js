// 导入request
import request from '@/utils/request'

// 配置用户登录请求
export const loginAPI = (data) => request({
  method: 'POST',
  url: '/user/login',
  data
})
