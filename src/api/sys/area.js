import { request } from '@/utils/request';

/**
 * 获取所有的区域信息(分页)
 *
 * @param {*} data 区域信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-11
 */
export async function getAreaPageList(data) {
  const resp = await request({
    url: '/sys/area/page',
    params: data
  });
  return resp.data;
}

/**
 * 获取区域详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-11
 */
export async function getAreaDetail(id) {
  const resp = await request({
    url: `/sys/area/details/${id}`
  });
  return resp.data;
}

/**
 * 添加区域
 *
 * @param {*} data 区域信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-11
 */

export async function addArea(data) {
  const resp = await request({
    url: '/sys/area/add',
    method: 'post',
    data
  });
  return resp.data;
}

/**
 * 编辑区域
 *
 * @param {*} data 区域信息
 * @param {*} id 区域id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-11
 */
export async function editArea(data, id) {
  const resp = await request({
    url: '/sys/area/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
  return resp.data;
}
/**
 * 删除区域（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-11
 */
export async function deleteArea(ids) {
  const resp = await request({
    url: '/sys/area/delete',
    method: 'post',
    params: {
      ids
    }
  });
  return resp.data;
}

/**
 * 根据id查询城市区域树结构
 *
 * @param {*} data 城市区域信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-10
 */
export async function getCityTreeById(data) {
  const resp = await request({
    url: '/sys/area/getAreaTreeById',
    params: data
  });
  return resp.data;
}

/**
 * 查询城市区域树结构
 *
 * @param {*} data 城市区域信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-10
 */
export async function getCityTree(data) {
  const resp = await request({
    url: '/sys/area/getAreaTree',
    params: data
  });
  return resp.data;
}
