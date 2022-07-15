import request from '@/utils/request'

/**
 *
 * @returns 首页轮播图
 */
export const getBannerAPI = () => {
  return request({
    method: 'GET',
    url: '/home/swiper'
  })
}

/**
 *获取租房小组的数据
 * @returns promise
 */
export const getRentGroupsAPI = () => {
  return request({
    method: 'GET',
    url: '/home/groups?AREA|88cff55c-aaa4-e2e0'
  })
}
