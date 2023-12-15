/**
 * 商品模块用到的全局过滤球注册 结合vuex
 */

import store from '../store';

/**
 * 根据平台分类id获取分类名称
 * @param id
 * @returns {*}
 */
export function getPlatCateNameById(id) {
  return store.getters['product/platCateById'](id);
}
