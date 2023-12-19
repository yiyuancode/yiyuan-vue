import { request } from '@/utils/request';

/**
 * 获取所有的店铺商品分类信息(全部)
 *
 * @param {*} data 店铺商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryShopList(data) {
  return request({
    url: '/ptm/productCategoryShop/list',
    params: data
  });
}
/**
 * 获取所有的店铺商品分类信息(分页)
 *
 * @param {*} data 店铺商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryShopPageList(data) {
  return request({
    url: '/ptm/productCategoryShop/page',
    params: data
  });
}

/**
 * 获取店铺商品分类详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryShopDetail(id) {
  return request({
    url: `/ptm/productCategoryShop/details/${id}`
  });
}

/**
 * 添加店铺商品分类
 *
 * @param {*} data 店铺商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */

export function addProductCategoryShop(data) {
  return request({
    url: '/ptm/productCategoryShop/add',
    method: 'post',
    data
  });
}

/**
 * 编辑店铺商品分类
 *
 * @param {*} data 店铺商品分类信息
 * @param {*} id 店铺商品分类id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function editProductCategoryShop(data, id) {
  return request({
    url: '/ptm/productCategoryShop/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除店铺商品分类（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function deleteProductCategoryShop(ids) {
  return request({
    url: '/ptm/productCategoryShop/delete',
    method: 'post',
    params: {
      ids
    }
  });
}

/**
 * 查询店铺商品分类树结构
 *
 * @param {*} data 店铺商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryShopTree(data) {
  return request({
    url: '/ptm/productCategoryShop/tree',
    params: data
  });
}
