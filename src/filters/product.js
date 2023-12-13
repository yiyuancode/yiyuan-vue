/**
 * 商品模块用到的全局过滤球注册 结合vuex
 */

import store from '../store';
export function getPlatCateNameById(id) {
  return store.getters['product/platCateById'](id);
}
