import { request } from '@/utils/request';


/**
 * 获取所有的店铺信息(分页)
 *
 * @param {*} data 店铺信息
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function getShopList(data) {
  return request({
    url: '/spm/shop/list',
    params: data
  });
}

/**
 * 获取所有的店铺信息(分页)
 *
 * @param {*} data 店铺信息
 * @return
 * @author  一源-spring
 * @date 2023-10-16
 */
export function getShopPageList(data) {
  return request({
    url: '/spm/shop/page',
    params: data
  });
}

/**
 * 获取店铺详情
 *
 * @param {*} id
 * @return
 * @author  一源-spring
 * @date 2023-10-16
 */
export function getShopDetail(id) {
  return request({
    url: `/spm/shop/details/${id}`
  });
}

/**
 * 添加店铺
 *
 * @param {*} data 店铺信息
 * @return
 * @author  一源-spring
 * @date 2023-10-16
 */

export function addShop(data) {
  return request({
    url: '/spm/shop/add',
    method: 'post',
    data
  });
}

/**
 * 编辑店铺
 *
 * @param {*} data 店铺信息
 * @param {*} id 店铺id
 * @return
 * @author  一源-spring
 * @date 2023-10-16
 */
export function editShop(data, id) {
  return request({
    url: '/spm/shop/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}

/**
 * 删除店铺（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源-spring
 * @date 2023-10-16
 */
export function deleteShop(ids) {
  return request({
    url: '/spm/shop/delete',
    method: 'post',
    params: {
      ids
    }
  });
}
/**
 * 店铺类别
 *
 * @param {*} 
 * @return
 * @author  一源-spring
 * @date 2023-11-1
 */
export function shopTypeList() {
  return request({
    url: '/spm/shopType/list',
    method: 'get',
    params: {}
  });
}
