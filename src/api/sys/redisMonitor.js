import { request } from '@/utils/request';

/**
 * 获取所有的Redis监控采集信息(分页)
 *
 * @param {*} data Redis监控采集信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export async function getRedisMonitorPageList(data) {
  const resp = await request({
    url: '/sys/redisMonitor/page',
    params: data
  });
  return resp.data;
}

/**
 * 获取Redis监控采集详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export async function getRedisMonitorDetail(id) {
  const resp = await request({
    url: `/sys/redisMonitor/details/${id}`
  });
  return resp.data;
}

/**
 * 添加Redis监控采集
 *
 * @param {*} data Redis监控采集信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */

export async function addRedisMonitor(data) {
  const resp = await request({
    url: '/sys/redisMonitor/add',
    method: 'post',
    data
  });
  return resp.data;
}

/**
 * 编辑Redis监控采集
 *
 * @param {*} data Redis监控采集信息
 * @param {*} id Redis监控采集id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export async function editRedisMonitor(data, id) {
  const resp = await request({
    url: '/sys/redisMonitor/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
  return resp.data;
}
/**
 * 删除Redis监控采集（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
export async function deleteRedisMonitor(ids) {
  const resp = await request({
    url: '/sys/redisMonitor/delete',
    method: 'post',
    params: {
      ids
    }
  });
  return resp.data;
}
