import {request} from '@/utils/request';

/**
 * 获取所有的商品类型—品牌中间信息(分页)
 *
 * @param {*} data 商品类型—品牌中间信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductCategoryBrandLinkPageList(data) {
  return request({
    url: '/ptm/productCategoryBrandLink/page',
    params: data
  });
}

/**
 * 获取商品类型—品牌中间详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductCategoryBrandLinkDetail(id) {
  return request({
    url: `/ptm/productCategoryBrandLink/details/${id}`
  });
}

/**
 * 添加商品类型—品牌中间
 *
 * @param {*} data 商品类型—品牌中间信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductCategoryBrandLink(data) {
  return request({
    url: '/ptm/productCategoryBrandLink/add',
    method: 'post',
    data
  });
}

/**
 * 编辑商品类型—品牌中间
 *
 * @param {*} data 商品类型—品牌中间信息
 * @param {*} id 商品类型—品牌中间id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductCategoryBrandLink(data, id) {
  return request({
    url: '/ptm/productCategoryBrandLink/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}

/**
 * 删除商品类型—品牌中间（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductCategoryBrandLink(ids) {
  return request({
    url: '/ptm/productCategoryBrandLink/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
