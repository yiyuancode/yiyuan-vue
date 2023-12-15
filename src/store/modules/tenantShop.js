import { getBoolen, getObj, getStr, setObj, setStr } from '@/utils/jsonUtil.js';
import {getShopList } from "@/api/spm/shop.js";
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
    getShopById:(state) =>(id)=>{
      let shopList = getObj(state, 'shopList');
      let currentShop = shopList.find(item => item.id === id);
      return currentShop.shopName;
    }
  },
  mutations: {
    shopList(state, data){
      setObj(state, 'shopList', data);
    }
  },
  actions: {
    shopList: async ({ commit }, data) =>{
      let shopList = await getShopList(null);
      commit('shopList', shopList);
    },
    clearShopList:({commit}, data) => {
      commit('shopList', null);
    }
  }
}
