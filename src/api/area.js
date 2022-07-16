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

/**
 * 获取热门城市
 * @returns Promise
 */
export const getHotCityListAPI = () => {
  return request({
    method: 'GET',
    url: '/area/hot'
  })
}

export const getCityInfoNameAPI = (name) => {
  return request({
    method: 'GET',
    url: `/area/info?name=${name}`
  })
}
