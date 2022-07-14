import request from '@/utils/request'

/**
 *
 * @returns 获取城市列表数据
 */
export const getCityList = (level) => {
  return request({
    method: 'GET',
    url: `/area/city${level}`
  })
}
