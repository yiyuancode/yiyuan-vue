import { request } from '@/utils/request';

/**
 * 获取所有的积分信息(全部)
 *
 * @param {*} data 积分信息
 * @return
 * @author  spring
 * @date 2023-12-19
 */
export function getIntegralList(data) {
  return request({
    url: '/um/integral/list',
    params: data
  });
}
/**
 * 获取所有的积分信息(分页)
 *
 * @param {*} data 积分信息
 * @return
 * @author  spring
 * @date 2023-12-19
 */
export function getIntegralPageList(data) {
  return request({
    url: '/um/integral/page',
    params: data
  });
}

/**
 * 获取积分详情
 *
 * @param {*} id
 * @return
 * @author  spring
 * @date 2023-12-19
 */
export function getIntegralDetail(id) {
  return request({
    url: `/um/integral/details/${id}`
  });
}

/**
 * 添加积分
 *
 * @param {*} data 积分信息
 * @return
 * @author  spring
 * @date 2023-12-19
 */

export function addIntegral(data) {
  return request({
    url: '/um/integral/add',
    method: 'post',
    data
  });
}

/**
 * 编辑积分
 *
 * @param {*} data 积分信息
 * @param {*} id 积分id
 * @return
 * @author  spring
 * @date 2023-12-19
 */
export function editIntegral(data, id) {
  return request({
    url: '/um/integral/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除积分（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  spring
 * @date 2023-12-19
 */
export function deleteIntegral(ids) {
  return request({
    url: '/um/integral/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
