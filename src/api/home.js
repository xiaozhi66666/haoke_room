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
