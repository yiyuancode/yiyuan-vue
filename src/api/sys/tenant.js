import { request } from '@/utils/request';

/**
 * 获取所有的租户信息(分页)
 *
 * @param {*} data 租户信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantPageList(data) {
  const resp = await request({
    url: '/sys/tenant/page',
    params: data
  });
  return resp.data;
}

/**
 * 获取租户详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantDetail(id) {
  const resp = await request({
    url: `/sys/tenant/details/${id}`
  });
  return resp.data;
}

/**
 * 添加租户
 *
 * @param {*} data 租户信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addTenant(data) {
  const resp = await request({
    url: '/sys/tenant/add',
    method: 'post',
    data
  });
  return resp.data;
}

/**
 * 编辑租户
 *
 * @param {*} data 租户信息
 * @param {*} id 租户id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editTenant(data, id) {
  const resp = await request({
    url: '/sys/tenant/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
  return resp.data;
}
/**
 * 删除租户（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteTenant(ids) {
  const resp = await request({
    url: '/sys/tenant/delete',
    method: 'post',
    params: {
      ids
    }
  });
  return resp.data;
}
