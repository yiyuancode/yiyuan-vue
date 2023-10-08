import {request} from '@/utils/request';

/**
 * 获取所有的Redis记录信息(分页)
 *
 * @param {*} data Redis记录信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export function getRedisPageList(data) {
  return request({
    url: '/sys/redis/page',
    params: data
  });
}

/**
 * 获取Redis记录详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export function getRedisDetail(id) {
  return request({
    url: `/sys/redis/details/${id}`
  });
}

/**
 * 添加Redis记录
 *
 * @param {*} data Redis记录信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */

export function addRedis(data) {
  return request({
    url: '/sys/redis/add',
    method: 'post',
    data
  });
}

/**
 * 编辑Redis记录
 *
 * @param {*} data Redis记录信息
 * @param {*} id Redis记录id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export function editRedis(data, id) {
  return request({
    url: '/sys/redis/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除Redis记录（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export function deleteRedis(ids) {
  return request({
    url: '/sys/redis/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
