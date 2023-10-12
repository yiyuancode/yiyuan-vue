import { request } from '@/utils/request';

/**
 * 获取所有的品牌信息(分页)
 *
 * @param {*} data 品牌信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductBrandPageList(data) {
  return request({
    url: '/ptm/productBrand/page',
    params: data
  });
}

/**
 * 获取品牌详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductBrandDetail(id) {
  return request({
    url: `/ptm/productBrand/details/${id}`
  });
}

/**
 * 添加品牌
 *
 * @param {*} data 品牌信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductBrand(data) {
  return request({
    url: '/ptm/productBrand/add',
    method: 'post',
    data
  });
}

/**
 * 编辑品牌
 *
 * @param {*} data 品牌信息
 * @param {*} id 品牌id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductBrand(data, id) {
  return request({
    url: '/ptm/productBrand/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除品牌（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductBrand(ids) {
  return request({
    url: '/ptm/productBrand/delete',
    method: 'post',
    params: {
      ids
    }
  });
}