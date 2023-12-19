import { request } from '@/utils/request';

/**
 * 获取所有的保障服务信息(全部)
 *
 * @param {*} data 保障服务信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
export function getProductGuaranteeList(data) {
  return request({
    url: '/ptm/productGuarantee/list',
    params: data
  });
}

/**
 * 获取所有的保障服务信息(分页)
 *
 * @param {*} data 保障服务信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
export function getProductGuaranteePageList(data) {
  return request({
    url: '/ptm/productGuarantee/page',
    params: data
  });
}

/**
 * 获取保障服务详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
export function getProductGuaranteeDetail(id) {
  return request({
    url: `/ptm/productGuarantee/details/${id}`
  });
}

/**
 * 添加保障服务
 *
 * @param {*} data 保障服务信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */

export function addProductGuarantee(data) {
  return request({
    url: '/ptm/productGuarantee/add',
    method: 'post',
    data
  });
}

/**
 * 编辑保障服务
 *
 * @param {*} data 保障服务信息
 * @param {*} id 保障服务id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
export function editProductGuarantee(data, id) {
  return request({
    url: '/ptm/productGuarantee/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}

/**
 * 删除保障服务（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
export function deleteProductGuarantee(ids) {
  return request({
    url: '/ptm/productGuarantee/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
