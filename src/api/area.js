import request from '@/utils/request'

/**
 *
 * @param {城市等级} level
 * @returns 城市列表
 */
export const getCityListAPI = (level) => {
  return request({
    method: 'GET',
    url: `/area/city?level=${level}`
  })
}
