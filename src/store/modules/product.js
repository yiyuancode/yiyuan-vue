import { getBoolen, getObj, getStr, setObj, setStr } from '@/utils/jsonUtil.js';
import { getProductCategoryPlatList } from '@/api/ptm/productCategoryPlat.js'
import { getProductBrandAllList } from '@/api/ptm/productBrand.js'
import { getProductGuaranteeList } from "@/api/ptm/productGuarantee";
import {getFreightTempList} from "@/api/ftm/freightTemp";
export default {
  namespaced: true,
  state: {
    platCategoryList: null, // 平台分类集合
    brandList: null, // 品牌集合
    productGuaranteeList: null, // 保障服务
    freightTempList: null,  // 运费模版

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
    freightTempList:(state) => {
      return getObj(state, 'freightTempList');
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
    // 服务条款
    getProductGuaranteeById:(state) => (ids) => {
      let productGuaranteeList = getObj(state, 'productGuaranteeList');
      let idsList = ids.includes(",") ? ids.split(",") : [ids];
      let guaranteeNames = [];
      idsList.map(id => {
        let currentGuarantee = productGuaranteeList.find(item => item.id === id);
        guaranteeNames.push(currentGuarantee.name);
      });
      return guaranteeNames.join(", ");
    },
    // 运费模版
    freightTempById:(state) => (id) => {
      let freightTempList = getObj(state, 'freightTempList');
      let currentTemp = freightTempList.find(item => item.id === id);
      return currentTemp.name;
    },
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
    freightTempList(state, data){
      setObj(state, 'freightTempList', data);
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
    freightTempList: async ({commit}, data) => {
      let freightTempList = await getFreightTempList(null);
      commit('freightTempList', freightTempList);
    },
    clearPlatCategoryList:({commit}, data ) =>{
      commit('platCategoryList', null);
    },
    clearBrandList:({commit}, data ) =>{
      commit('brandList', null);
    },
    clearProductGuaranteeList:({commit}, data ) =>{
      commit('productGuaranteeList', null);
    },
    clearFreightTempList:({commit}, data ) =>{
      commit('freightTempList', null);
    }
  }
}
