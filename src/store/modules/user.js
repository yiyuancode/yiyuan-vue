import {getBoolen, getObj, getStr, setObj, setStr} from '@/utils/jsonUtil.js';
import {getUserInfo, login} from '@/api/sys/user.js';


export default {
  namespaced: true,
  state: {
    myToken: null,
    myUserInfo: null,
    isLogin: false,

  },
  getters: {
    isLogin: (state) => {
      return getBoolen(state, "isLogin");
    },
    myToken: (state) => {
      return getStr(state, "myToken");
    },
    myUserInfo: (state) => {
      return getObj(state, "myUserInfo");
    },
  },
  mutations: {

    isLogin(state, data) {
      setObj(state, "isLogin", data)
    },
    myToken(state, data) {
      setStr(state, "myToken", data)
    },
    myUserInfo(state, data) {
      setObj(state, "myUserInfo", data)
    },


  },
  actions: {
    //登录
    login: async ({
                    commit
                  }, data) => {
      let loginResp = await login(data);
      commit('myToken', loginResp.token);
      let getUserInfoResp = await getUserInfo();
      commit('myUserInfo', getUserInfoResp);
      commit('isLogin', true);
    },

    loginout: ({
                 commit
               }) => {
      commit('myToken', null);
      commit('myUserInfo', null);
      commit('isLogin', false);
    },
  }
}
