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


/**
 * 根据保障服务id获取保障服务名称
 * @param id
 * @returns {*}
 */
export function getProductGuaranteeNameById(id) {
  return store.getters['product/getProductGuaranteeById'](id);
}

/**
 * 根据运费模版id获取模版名称
 * @param id
 * @returns {*}
 */
export function getFreightTempByIdNameById(id) {
  return store.getters['product/freightTempById'](id);
}
