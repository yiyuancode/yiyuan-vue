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
  const finalData = JSON.parse(JSON.stringify(data));
  if (finalData.pid) {
    finalData.pid = finalData.pid = finalData.pid[finalData.pid.length - 1];
  }
  return request({
    url: '/ptm/productCategory/page',
    params: finalData
  });
}

/**
 * 获取商品类型 属性结构数据
 * @param data
 * @returns {*}
 */
export function getProductCategoryTreeList(data) {
  return request({
    url: '/ptm/productCategory/treeList',
    params: data
  });
}

/**
 * 获取所有的商品分类信息
 *
 * @param {*} data 商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
export function getProductCategoryList(data) {
  return request({
    url: '/ptm/productCategory/list',
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
  const finalData = JSON.parse(JSON.stringify(data));
  if (finalData.pid) {
    finalData.pid = finalData.pid = finalData.pid[finalData.pid.length - 1];
  }
  return request({
    url: '/ptm/productCategory/add',
    method: 'post',
    data: finalData
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
  //对传递的pid 进行 数据处理 程序中使用数组，实际传递参数的时候使用数组最后一位参数 为实际分类参数
  const finalData = JSON.parse(JSON.stringify(data));
  if (finalData.pid) {
    finalData.pid = finalData.pid = finalData.pid[finalData.pid.length - 1];
  }
  return request({
    url: '/ptm/productCategory/edit',
    method: 'post',
    data: {
      ...finalData,
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
