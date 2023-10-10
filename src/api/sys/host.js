import { request } from '@/utils/request';

/**
 * 获取所有的服务器信息(分页)
 *
 * @param {*} data 服务器信息
 * @return
 * @author  红枣粽子
 * @date 2023-10-08
 */
export function getHostPageList(data) {
  return request({
    url: '/sys/host/page',
    params: data
  });
}

/**
 * 获取服务器详情
 *
 * @param {*} id
 * @return
 * @author  红枣粽子
 * @date 2023-10-08
 */
export function getHostDetail(id) {
  return request({
    url: `/sys/host/details/${id}`
  });
}

/**
 * 添加服务器
 *
 * @param {*} data 服务器信息
 * @return
 * @author  红枣粽子
 * @date 2023-10-08
 */

export function addHost(data) {
  return request({
    url: '/sys/host/add',
    method: 'post',
    data
  });
}

/**
 * 编辑服务器
 *
 * @param {*} data 服务器信息
 * @param {*} id 服务器id
 * @return
 * @author  红枣粽子
 * @date 2023-10-08
 */
export function editHost(data, id) {
  return request({
    url: '/sys/host/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除服务器（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  红枣粽子
 * @date 2023-10-08
 */
export function deleteHost(ids) {
  return request({
    url: '/sys/host/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
