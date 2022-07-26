import request from '@/utils/request';

/**
 * 根据条件查询房屋
 * @returns Promise
 */
export const getHouseInfoAPI = (cityId, start, end) => {
  return request({
    url: '/houses',
    params: {
      cityId,
      start,
      end
    }
  });
};

/**
 * 查询房屋具体信息
 * @param {Number} code 房屋的具体code值
 * @returns  Promise
 */
export const getHouseFullInfoAPI = (code) => {
  return request({
    url: `/houses/${code}`
  });
};

/**
 *获取房屋查询条件
 * @param {String} id 城市id
 * @returns 城市详细区名和对应小区名
 */
export const getHouseCondiTionsAPI = (id) =>
  request({
    url: `/houses/condition?id=${id}`
  });
