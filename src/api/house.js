import request from '@/utils/request'

/**
 * 根据条件查询房屋
 * @returns Promise
 */
export const getHouseInfoAPI = (id) => {
  return request({
    url: `/houses?cityId=${id}`
  })
}

/**
 * 查询房屋具体信息
 * @param {Number} code 房屋的具体code值
 * @returns  Promise
 */
export const getHouseFullInfoAPI = (code) => {
  return request({
    url: `/houses/${code}`
  })
}
