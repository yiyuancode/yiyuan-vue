import { getBoolen, getObj, getStr, setObj, setStr } from '@/utils/jsonUtil.js';
import {getShopList } from "@/api/spm/shop.js";
import { getProductCategoryShopList } from "@/api/ptm/productCategoryShop.js"
export default {
  namespaced: true,
  state: {
    shopList:null, // 商户列表
    shopCategoryIds: null, // 商户分类

  },
  getters: {
    shopList:(state) => {
      return getObj(state, 'shopList');
    },
    shopCategoryIds:(state) => {
      return getObj(state, 'shopCategoryIds');
    },
    getShopById:(state) =>(id)=>{
      let shopList = getObj(state, 'shopList');
      let currentShop = shopList.find(item => item.id === id);
      return currentShop.shopName;
    },
    getShopCateById:(state) => (id) => {
      let shopCategoryIds = getObj(state, 'shopCategoryIds');
      let currentCate = shopCategoryIds.find(item => item.id === id);
      return currentCate.name;
    }
  },
  mutations: {
    shopList(state, data){
      setObj(state, 'shopList', data);
    },
    shopCategoryIds(state, data){
      setObj(state, 'shopCategoryIds', data);
    }
  },
  actions: {
    shopList: async ({ commit }, data) =>{
      let shopList = await getShopList(null);
      commit('shopList', shopList);
    },
    shopCategoryIds: async ({ commit }, data) =>{
      let shopCateList = await getProductCategoryShopList(null);
      commit('shopCategoryIds', shopCateList);
    },
    clearShopList:({commit}, data) => {
      commit('shopList', null);
    },
    clearShopCateList:({commit}, data) => {
      commit('shopCategoryIds', null);
    }
  }
}
