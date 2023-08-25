import { request } from '@/utils/request';

/**
 * 获取所有的定时任务信息(分页)
 *
 * @param {*} data 定时任务信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getQrtzPageList(data) {
  const resp = await request({
    url: '/sys/qrtz/page',
    params: data
  });
  return resp.data;
}

/**
 * 获取定时任务详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getQrtzDetail(id) {
  const resp = await request({
    url: `/sys/qrtz/details/${id}`
  });
  return resp.data;
}

/**
 * 添加定时任务
 *
 * @param {*} data 定时任务信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addQrtz(data) {
  const resp = await request({
    url: '/sys/qrtz/add',
    method: 'post',
    data
  });
  return resp.data;
}

/**
 * 编辑定时任务
 *
 * @param {*} data 定时任务信息
 * @param {*} id 定时任务id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editQrtz(data, id) {
  const resp = await request({
    url: '/sys/qrtz/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
  return resp.data;
}
/**
 * 删除定时任务（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteQrtz(ids) {
  const resp = await request({
    url: '/sys/qrtz/delete',
    method: 'post',
    params: {
      ids
    }
  });
  return resp.data;
}
