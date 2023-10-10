import { request } from '@/utils/request';

/**
 * 获取所有的商品sku信息(分页)
 *
 * @param {*} data 商品sku信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductSkuPageList(data) {
  return request({
    url: '/ptm/productSku/page',
    params: data
  });
}

/**
 * 获取商品sku详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductSkuDetail(id) {
  return request({
    url: `/ptm/productSku/details/${id}`
  });
}

/**
 * 添加商品sku
 *
 * @param {*} data 商品sku信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductSku(data) {
  return request({
    url: '/ptm/productSku/add',
    method: 'post',
    data
  });
}

/**
 * 编辑商品sku
 *
 * @param {*} data 商品sku信息
 * @param {*} id 商品skuid
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductSku(data, id) {
  return request({
    url: '/ptm/productSku/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除商品sku（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductSku(ids) {
  return request({
    url: '/ptm/productSku/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
