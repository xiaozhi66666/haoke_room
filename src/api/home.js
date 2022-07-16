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

export const getCityHouseInfoAPI = () => {
  return request({
    method: 'GET',
    url: '/houses?cityId=AREA%7C88cff55c-aaa4-e2e0&area=AREA%7C88cff55c-aaa4-e2e0&rentType=true&price=null&more=CHAR%7C76eb0532-8099-d1f4%2CFLOOR%7C1%2CAREA%7C88cff55c-aaa4-e2e0%2CORIEN%7C61e99445-e95e-7f37%2Ctrue&roomType=ROOM%7Cd1a00384-5801-d5cd&oriented=ORIEN%7C61e99445-e95e-7f37&characteristic=CHAR%7C76eb0532-8099-d1f4&floor=FLOOR%7C1&start=1&end=20'
  })
}
