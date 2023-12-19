import { getBoolen, getObj, getStr, setObj, setStr } from '@/utils/jsonUtil.js';
import { getProductCategoryPlatList } from '@/api/ptm/productCategoryPlat.js'
import { getProductBrandAllList } from '@/api/ptm/productBrand.js'
import { getProductGuaranteeList } from "@/api/ptm/productGuarantee";
export default {
  namespaced: true,
  state: {
    platCategoryList: null, // 平台分类集合
    brandList: null, // 品牌集合
    productGuaranteeList: null, // 保障服务

  },
  getters: {
    platCategoryList: (state) => {
      return getObj(state, 'platCategoryList');
    },
    brandList:(state) => {
      return getObj(state, 'brandList');
    },
    productGuaranteeList:(state) => {
      return getObj(state, 'productGuaranteeList');
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
    getProductGuaranteeById:(state) => (ids) => {
      let productGuaranteeList = getObj(state, 'productGuaranteeList');
      let idsList = ids.includes(",") ? ids.split(",") : [ids];
      let guaranteeNames = [];
      idsList.map(id => {
        let currentGuarantee = productGuaranteeList.find(item => item.id === id);
        guaranteeNames.push(currentGuarantee.name);
      });
      return guaranteeNames.join(", ");
    }
  },
  mutations: {
    platCategoryList(state, data){
      setObj(state, 'platCategoryList', data);
    },
    brandList(state, data){
      setObj(state, 'brandList', data);
    },
    productGuaranteeList(state, data){
      setObj(state, 'productGuaranteeList', data);
    },
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
    productGuaranteeList: async ({commit}, data) => {
      let productGuaranteeList = await getProductGuaranteeList(null);
      commit('productGuaranteeList', productGuaranteeList);
    },
    clearPlatCategoryList:({commit}, data ) =>{
      commit('platCategoryList', null);
    },
    clearBrandList:({commit}, data ) =>{
      commit('brandList', null);
    },
    clearProductGuaranteeList:({commit}, data ) =>{
      commit('productGuaranteeList', null);
    }
  }
}
