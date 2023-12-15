/**
 * 结合vuex的全局过滤器 商户信息
 */


import store from '../store';

/**
 * 根据商户id获取商户名称
 * @param id
 * @returns {*}
 */
export function getShopNameById(id) {
  return store.getters['tenantShop/getShopById'](id);
}

export function getShopCateById(id){
  return store.getters['tenantShop/getShopCateById'](id);
}
