import { request } from '@/utils/request';

/**
 * 获取所有的店铺-主营类目关联信息(分页)
 *
 * @param {*} data 店铺-主营类目关联信息
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function getShopCategoryLinkPageList(data) {
  return request({
    url: '/spm/shopCategoryLink/page',
    params: data
  });
}

/**
 * 获取店铺-主营类目关联详情
 *
 * @param {*} id
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function getShopCategoryLinkDetail(id) {
  return request({
    url: `/spm/shopCategoryLink/details/${id}`
  });
}

/**
 * 添加店铺-主营类目关联
 *
 * @param {*} data 店铺-主营类目关联信息
 * @return
 * @author  spring
 * @date 2023-10-16
 */

export function addShopCategoryLink(data) {
  return request({
    url: '/spm/shopCategoryLink/add',
    method: 'post',
    data
  });
}

/**
 * 编辑店铺-主营类目关联
 *
 * @param {*} data 店铺-主营类目关联信息
 * @param {*} id 店铺-主营类目关联id
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function editShopCategoryLink(data, id) {
  return request({
    url: '/spm/shopCategoryLink/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}
/**
 * 删除店铺-主营类目关联（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function deleteShopCategoryLink(ids) {
  return request({
    url: '/spm/shopCategoryLink/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
