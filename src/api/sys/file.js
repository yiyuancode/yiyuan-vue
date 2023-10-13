import { request } from '@/utils/request';

/**
 * 上传文件
 *
 * @param {*} data 商品信息信息
 * @param {*} id 商品信息id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function fileUpload(file) {
  let formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/file/upload',
    method: 'POST',
    // headers: {
    //   'Content-type': 'multipart/form-data'
    // },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
    },
    data: formData
  });
}
