import { getBoolen, getObj, getStr, setObj, setStr } from '@/utils/jsonUtil.js';
import { getProductCategoryPlatList } from '@/api/ptm/productCategoryPlat.js'
import { getProductBrandAllList } from '@/api/ptm/productBrand.js'
export default {
  namespaced: true,
  state: {
    platCategoryList: null, // 平台分类集合
    brandList: null, // 品牌集合

  },
  getters: {
    platCategoryList: (state) => {
      return getObj(state, 'platCategoryList');
    },
    brandList:(state) => {
      return getObj(state, 'brandList');
    },
    // 配合过滤器使用
    platCateById:(state) => (id) => {
      let platCateList = getObj(state, 'platCategoryList');
      let currentPlatCate = platCateList.find(item => item.id === id);
      return currentPlatCate.name;
    },
    brandById:(state) => (id) => {
      let brandList = getObj(state, 'brandList');
      let currentBrand = brandList.find(item => item.id === id);
      return currentBrand.name;
    },
  },
  mutations: {
    platCategoryList(state, data){
      setObj(state, 'platCategoryList', data);
    },
    brandList(state, data){
      setObj(state, 'brandList', data);
    }
  },
  actions: {
    platCategoryList: async ({commit}, data) => {
      let platCateList = await getProductCategoryPlatList(null);
      commit('platCategoryList', platCateList);
    },
    brandList: async ({commit}, data) => {
      let brandList = await getProductBrandAllList(null);
      commit('brandList', brandList);
    },
    clearPlatCategoryList:({commit}, data ) =>{
      commit('platCategoryList', null);
    },
    clearBrandList:({commit}, data ) =>{
      commit('brandList', null);
    }
  }
}
