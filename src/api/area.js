import request from '@/utils/request';

/**
 *
 * @param {城市等级} level
 * @returns 城市列表
 */
export const getCityListAPI = (level) => {
  return request({
    method: 'GET',
    url: `/area/city?level=${level}`
  });
};

/**
 * 获取热门城市
 * @returns Promise
 */
export const getHotCityListAPI = () => {
  return request({
    url: '/area/hot'
  });
};
/**
 * 获取城市id
 * @param {String} name 城市名
 * @returns Promise
 */
export const getCityInfoNameAPI = (name) => {
  return request({
    url: `/area/info?name=${name}`
  });
};

/**
 * 获取指定城市的子集城市(区县)列表
 * @param {String} id 城市id
 * @returns  Promise
 */
export const getSonCityListAPI = (id) => {
  return request({
    url: `/area?id=${id}`
  });
};

/**
 * 使用关键词查询小区信息
 * @param {String} name 城市/小区关键词
 * @param {String} id  当前定位城市id
 * @returns Promise
 */
export const getCommunityAPI = (name, id) =>
  request({
    url: 'area/community',
    params: {
      name,
      id
    }
  });
