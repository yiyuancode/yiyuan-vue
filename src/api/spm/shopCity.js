import { request } from '@/utils/request';

/**
 * 获取所有的城市区域信息(分页)
 *
 * @param {*} data 城市区域信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-10
 */
export async function getShopCityPageList(data) {
  const resp = await request({
    url: '/spm/shopCity/page',
    params: data
  });
  return resp.data;
}

/**
 * 获取城市区域详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-10
 */
export async function getShopCityDetail(id) {
  const resp = await request({
    url: `/spm/shopCity/details/${id}`
  });
  return resp.data;
}

/**
 * 添加城市区域
 *
 * @param {*} data 城市区域信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-10
 */

export async function addShopCity(data) {
  const resp = await request({
    url: '/spm/shopCity/add',
    method: 'post',
    data
  });
  return resp.data;
}

/**
 * 编辑城市区域
 *
 * @param {*} data 城市区域信息
 * @param {*} id 城市区域id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-10
 */
export async function editShopCity(data, id) {
  const resp = await request({
    url: '/spm/shopCity/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
  return resp.data;
}

/**
 * 删除城市区域（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-09-10
 */
export async function deleteShopCity(ids) {
  const resp = await request({
    url: '/spm/shopCity/delete',
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
    url: '/spm/shopCity/getCityTreeById',
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
  console.log(data);
  const resp = await request({
    url: '/spm/shopCity/getCityTree',
    params: data
  });
  return resp.data;
}
