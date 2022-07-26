import request from '@/utils/request';
/**
 *
 * @param {FormData的键名} file FormData的键名（form.append('file', 图片对象)）
 * @returns Promise
 */
export const setHouseImageAPI = (file) =>
  request({
    url: '/houses/image',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    }, //
    data: {
      file
    }
  });
