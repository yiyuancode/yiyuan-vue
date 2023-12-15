import { request } from '@/utils/request';

/**
 * 获取所有的品牌信息(分页)
 *
 * @param {*} data 品牌信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductBrandPageList(data) {
  // let finalData = JSON.parse(JSON.stringify(data));
  // console.log('finalData:', finalData);
  // finalData.name = finalData.name ? encodeURI(finalData.name) : null;
  // TODO 参数encodeURI 后面处理
  return request({
    url: '/ptm/productBrand/page',
    params: data
  });
}

/**
 * 获取全部品牌数据
 * @param data 查询参数
 * @returns {*}
 */
export function getProductBrandAllList(data) {
  return request({
    url: '/ptm/productBrand/list',
    params: data
  });
}

/**
 * 获取品牌详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductBrandDetail(id) {
  return request({
    url: `/ptm/productBrand/details/${id}`
  });
}

/**
 * 添加品牌
 *
 * @param {*} data 品牌信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */

export function addProductBrand(data) {
  return request({
    url: '/ptm/productBrand/add',
    method: 'post',
    data:data
  });
}

/**
 * 编辑品牌
 *
 * @param {*} data 品牌信息
 * @param {*} id 品牌id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function editProductBrand(data, id) {
  // let finalData = JSON.parse(JSON.stringify(data));
  // if(finalData.categoryIds && finalData.categoryIds.length > 0) {
  //   finalData.categoryIds = finalData.categoryIds.join(",");
  // }
  return request({
    url: '/ptm/productBrand/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除品牌（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function deleteProductBrand(ids) {
  return request({
    url: '/ptm/productBrand/delete',
    method: 'post',
    params: {
      ids
    }
  });
}

/**
 * 根据分类id查询对应品牌
 * @param categoryId 分类id
 * @returns {*}
 */
export function listOfProductBrandByCid(categoryId) {
  return request({
    url: `/ptm/productBrand/listOfCategory/${categoryId}`,
    method: 'get'
  });
}
