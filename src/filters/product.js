/**
 * 商品模块用到的全局过滤球注册 结合vuex
 */

import store from '../store';

/**
 * 根据平台分类id获取分类名称
 * @param id 平台商品分类id
 * @returns {*}
 */
export function getPlatCateNameById(id) {
  return store.getters['product/platCateById'](id);
}


/**
 * 根据品牌id获取品牌对应名称
 * @param id 品牌id
 * @returns {*}
 */
export function getBrandNameById(id) {
  return store.getters['product/brandById'](id);
}
