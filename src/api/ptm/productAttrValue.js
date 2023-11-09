import {request} from '@/utils/request';

/**
 * 获取所有的商品属性value信息(分页)
 *
 * @param {*} data 商品属性value信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductAttrValuePageList(data) {
  return request({
    url: '/ptm/productAttrValue/page',
    params: data
  });
}

/**
 * 获取所有的商品属性value信息 不分页
 * @param data
 * @returns {*}
 */
export function getProductAttrValueList(data) {
  return request({
    url: '/ptm/productAttrValue/list',
    params: data
  });
}

/**
 * 获取商品属性value详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductAttrValueDetail(id) {
  return request({
    url: `/ptm/productAttrValue/details/${id}`
  });
}

/**
 * 添加商品属性value
 *
 * @param {*} data 商品属性value信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductAttrValue(data) {
  return request({
    url: '/ptm/productAttrValue/add',
    method: 'post',
    data
  });
}

/**
 * 编辑商品属性value
 *
 * @param {*} data 商品属性value信息
 * @param {*} id 商品属性valueid
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductAttrValue(data, id) {
  return request({
    url: '/ptm/productAttrValue/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}

/**
 * 删除商品属性value（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductAttrValue(ids) {
  return request({
    url: '/ptm/productAttrValue/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
