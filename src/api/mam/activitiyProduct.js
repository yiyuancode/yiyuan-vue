import { request } from '@/utils/request';

/**
 * 获取所有的活动商品信息(分页)
 *
 * @param {*} data 活动商品信息
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function getActivitiyProductPageList(data) {
  return request({
    url: '/mam/activitiyProduct/page',
    params: data
  });
}

/**
 * 获取活动商品详情
 *
 * @param {*} id
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function getActivitiyProductDetail(id) {
  return request({
    url: `/mam/activitiyProduct/details/${id}`
  });
}

/**
 * 添加活动商品
 *
 * @param {*} data 活动商品信息
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */

export function addActivitiyProduct(data) {
  return request({
    url: '/mam/activitiyProduct/add',
    method: 'post',
    data
  });
}

/**
 * 编辑活动商品
 *
 * @param {*} data 活动商品信息
 * @param {*} id 活动商品id
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function editActivitiyProduct(data, id) {
  return request({
    url: '/mam/activitiyProduct/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除活动商品（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function deleteActivitiyProduct(ids) {
  return request({
    url: '/mam/activitiyProduct/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
