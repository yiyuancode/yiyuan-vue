import { request } from '@/utils/request';

/**
 * 获取所有的商品信息信息(分页)
 *
 * @param {*} data 商品信息信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductPageList(data) {
  return request({
    url: '/ptm/product/page',
    params: data
  });
}

/**
 * 获取商品信息详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductDetail(id) {
  return request({
    url: `/ptm/product/details/${id}`
  });
}

/**
 * 添加商品信息
 *
 * @param {*} data 商品信息信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProduct(data) {
  return request({
    url: '/ptm/product/add',
    method: 'post',
    data
  });
}

/**
 * 编辑商品信息
 *
 * @param {*} data 商品信息信息
 * @param {*} id 商品信息id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProduct(data, id) {
  return request({
    url: '/ptm/product/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除商品信息（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProduct(ids) {
  return request({
    url: '/ptm/product/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
