import { request } from '@/utils/request';

/**
 * 获取所有的商品详情信息(分页)
 *
 * @param {*} data 商品详情信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductDetailsPageList(data) {
  return request({
    url: '/ptm/productDetails/page',
    params: data
  });
}

/**
 * 获取商品详情详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductDetailsDetail(id) {
  return request({
    url: `/ptm/productDetails/details/${id}`
  });
}

/**
 * 添加商品详情
 *
 * @param {*} data 商品详情信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductDetails(data) {
  return request({
    url: '/ptm/productDetails/add',
    method: 'post',
    data
  });
}

/**
 * 编辑商品详情
 *
 * @param {*} data 商品详情信息
 * @param {*} id 商品详情id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductDetails(data, id) {
  return request({
    url: '/ptm/productDetails/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}

/**
 * 删除商品详情（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductDetails(ids) {
  return request({
    url: '/ptm/productDetails/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
