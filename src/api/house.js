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
