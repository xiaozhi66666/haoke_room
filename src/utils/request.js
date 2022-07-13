// 导入axios
import axios from 'axios'

// 配置axios对象
const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 3000
})

// 默认导出
export default request
