import { request } from '@/utils/request';

/**
 * 获取所有的Redis记录信息(分页)
 *
 * @param {*} data Redis记录信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export async function getRedisPageList(data) {
  const resp = await request({
    url: '/sys/redis/page',
    params: data
  });
  return resp;
}

/**
 * 获取Redis记录详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export async function getRedisDetail(id) {
  const resp = await request({
    url: `/sys/redis/details/${id}`
  });
  return resp;
}

/**
 * 添加Redis记录
 *
 * @param {*} data Redis记录信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */

export async function addRedis(data) {
  const resp = await request({
    url: '/sys/redis/add',
    method: 'post',
    data
  });
  return resp;
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
export async function editRedis(data, id) {
  const resp = await request({
    url: '/sys/redis/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
  return resp;
}
/**
 * 删除Redis记录（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export async function deleteRedis(ids) {
  const resp = await request({
    url: '/sys/redis/delete',
    method: 'post',
    params: {
      ids
    }
  });
  return resp;
}
