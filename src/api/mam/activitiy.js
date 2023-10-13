import { request } from '@/utils/request';

/**
 * 获取所有的营销活动信息(分页)
 *
 * @param {*} data 营销活动信息
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function getActivitiyPageList(data) {
  return request({
    url: '/mam/activitiy/page',
    params: data
  });
}

/**
 * 获取营销活动详情
 *
 * @param {*} id
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function getActivitiyDetail(id) {
  return request({
    url: `/mam/activitiy/details/${id}`
  });
}

/**
 * 添加营销活动
 *
 * @param {*} data 营销活动信息
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */

export function addActivitiy(data) {
  return request({
    url: '/mam/activitiy/add',
    method: 'post',
    data
  });
}

/**
 * 编辑营销活动
 *
 * @param {*} data 营销活动信息
 * @param {*} id 营销活动id
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function editActivitiy(data, id) {
  return request({
    url: '/mam/activitiy/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除营销活动（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源-花和尚
 * @date 2023-10-13
 */
export function deleteActivitiy(ids) {
  return request({
    url: '/mam/activitiy/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
