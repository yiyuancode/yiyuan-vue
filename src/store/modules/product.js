import { getBoolen, getObj, getStr, setObj, setStr } from '@/utils/jsonUtil.js';
import { getProductCategoryPlatList } from '@/api/ptm/productCategoryPlat.js'
export default {
  namespaced: true,
  state: {
    platCategoryList: null,

  },
  getters: {
    platCategoryList: (state) => {
      return getObj(state, 'platCategoryList');
    },
    platCateById:(state) => (id) => {
      console.log('state.platCategoryList:', state.platCategoryList);
      return state.platCategoryList.find(item => item.id === id);
    }
  },
  mutations: {
    platCategoryList(state, data){
      setObj(state, 'platCategoryList', data);
    }
  },
  actions: {
    platCategoryList: async ({commit}, data) => {
      let platCateList = await getProductCategoryPlatList(null);
      console.log('vueX 中获取的全部平台列表：', platCateList);
      commit('platCategoryList', platCateList);
    },
    clearPlatCategoryList:({commit}, data ) =>{
      commit('platCategoryList', null);
    }
  }
}
