import { getBoolen, getObj, getStr, setObj, setStr } from '@/utils/jsonUtil.js';
import { getProductCategoryPlatList } from '@/api/ptm/productCategoryPlat.js'
export default {
  namespaced: true,
  state: {
    platCategoryList: null,

  },
  getters: {
    platCategoryList: (state) => {
      console.log('1:', state);
      return getObj(state, 'platCategoryList');
    },
    // 配合过滤器使用
    platCateById:(state) => (id) => {
      let platCateList = getObj(state, 'platCategoryList');
      let currentPlatCate = platCateList.find(item => item.id === id);
      return currentPlatCate.name;
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
