import { request } from '@/utils/request';

/**
 * 获取所有的商品分类信息(分页)
 *
 * @param {*} data 商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductCategoryPageList(data) {
  return request({
    url: '/ptm/productCategory/page',
    params: data
  });
}

/**
 * 获取商品分类详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductCategoryDetail(id) {
  return request({
    url: `/ptm/productCategory/details/${id}`
  });
}

/**
 * 添加商品分类
 *
 * @param {*} data 商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductCategory(data) {
  return request({
    url: '/ptm/productCategory/add',
    method: 'post',
    data
  });
}

/**
 * 编辑商品分类
 *
 * @param {*} data 商品分类信息
 * @param {*} id 商品分类id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductCategory(data, id) {
  return request({
    url: '/ptm/productCategory/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除商品分类（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductCategory(ids) {
  return request({
    url: '/ptm/productCategory/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
