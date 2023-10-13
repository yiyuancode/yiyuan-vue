import { request } from '@/utils/request';

/**
 * 获取所有的活动商品sku信息(分页)
 *
 * @param {*} data 活动商品sku信息
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function getActivitiyProductSkuPageList(data) {
  return request({
    url: '/mam/activitiyProductSku/page',
    params: data
  });
}

/**
 * 获取活动商品sku详情
 *
 * @param {*} id
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function getActivitiyProductSkuDetail(id) {
  return request({
    url: `/mam/activitiyProductSku/details/${id}`
  });
}

/**
 * 添加活动商品sku
 *
 * @param {*} data 活动商品sku信息
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */

export function addActivitiyProductSku(data) {
  return request({
    url: '/mam/activitiyProductSku/add',
    method: 'post',
    data
  });
}

/**
 * 编辑活动商品sku
 *
 * @param {*} data 活动商品sku信息
 * @param {*} id 活动商品skuid
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function editActivitiyProductSku(data, id) {
  return request({
    url: '/mam/activitiyProductSku/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除活动商品sku（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function deleteActivitiyProductSku(ids) {
  return request({
    url: '/mam/activitiyProductSku/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
