import { request } from '@/utils/request';

/**
 * 获取所有的商品属性key信息(分页)
 *
 * @param {*} data 商品属性key信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductAttrKeyPageList(data) {
  return request({
    url: '/ptm/productAttrKey/page',
    params: data
  });
}

/**
 * 获取商品属性key详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductAttrKeyDetail(id) {
  return request({
    url: `/ptm/productAttrKey/details/${id}`
  });
}

/**
 * 添加商品属性key
 *
 * @param {*} data 商品属性key信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductAttrKey(data) {
  let finalData = JSON.parse(JSON.stringify(data));
  finalData.ptmProductCategoryId =
    finalData.productCateId[finalData.productCateId.length - 1];
  console.log('finalData:', finalData);
  return request({
    url: '/ptm/productAttrKey/add',
    method: 'post',
    data: finalData
  });
}

/**
 * 编辑商品属性key
 *
 * @param {*} data 商品属性key信息
 * @param {*} id 商品属性keyid
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductAttrKey(data, id) {
  return request({
    url: '/ptm/productAttrKey/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除商品属性key（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductAttrKey(ids) {
  return request({
    url: '/ptm/productAttrKey/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
