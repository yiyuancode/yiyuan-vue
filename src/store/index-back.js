import Vue from 'vue';
import Vuex from 'vuex';
//导入 nprogress 对应的 js 和 css
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import $this from '@/main.js';
import { dynamicRoutesMap } from '@/router/index.js';
import { getUserInfo, login } from '@/api/sys/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myToken: null,
    myUserInfo: null,
    isLogin: false,
    menuCacheTree: [],
    //myTags:示例数据
    //myTags:[{"path":"host","name":"host","title":"主机管理","permissions":"sys:host","show":false,"choose":false},{"path":"dept","name":"dept","title":"部门管理","permissions":"sys:host","show":false,"choose":true}]
    myTags: [],
    myTagsArray: [],
    myTagsActiveKey: null,
    myMenuSelectedKeys: [],
    myMenuOpenKeys: []
  },
  getters: {
    myMenuOpenKeys: (state) => {
      if (state.myMenuOpenKeys.length == 0) {
        state.myMenuOpenKeys = !localStorage.getItem('myMenuOpenKeys')
          ? []
          : JSON.parse(localStorage.getItem('myMenuOpenKeys'));
      }
      return state.myMenuOpenKeys;
    },
    myMenuSelectedKeys: (state) => {
      if (state.myMenuSelectedKeys.length == 0) {
        state.myMenuSelectedKeys = !localStorage.getItem('myMenuSelectedKeys')
          ? []
          : JSON.parse(localStorage.getItem('myMenuSelectedKeys'));
      }
      //在这一步同时获取当前激活的key，因为menus会触发这个，而tabs组件的是v-model不能直接绑定gettrs
      if (!state.myTagsActiveKey) {
        state.myTagsActiveKey = !localStorage.getItem('myTagsActiveKey')
          ? ''
          : localStorage.getItem('myTagsActiveKey');
      }
      return state.myMenuSelectedKeys;
    },
    myTagsActiveKey: (state) => {
      if (!state.myTagsActiveKey) {
        state.myTagsActiveKey = !localStorage.getItem('myTagsActiveKey')
          ? ''
          : localStorage.getItem('myTagsActiveKey');
      }
      return state.myTagsActiveKey;
    },
    myToken: (state) => {
      if (!state.myToken) {
        state.myToken = !localStorage.getItem('myToken')
          ? ''
          : localStorage.getItem('myToken');
      }
      return state.myToken;
    },
    myUserInfo: (state) => {
      if (!state.myUserInfo) {
        state.myUserInfo = !localStorage.getItem('myUserInfo')
          ? {}
          : JSON.parse(localStorage.getItem('myUserInfo'));
      }
      return state.myUserInfo;
    },
    isLogin: (state) => {
      if (!state.isLogin) {
        state.isLogin = !localStorage.getItem('isLogin')
          ? false
          : JSON.parse(localStorage.getItem('isLogin'));
      }
      return state.isLogin;
    },
    menuCacheTree: (state) => {
      if (state.menuCacheTree.length == 0) {
        state.menuCacheTree = !localStorage.getItem('menuCacheTree')
          ? []
          : JSON.parse(localStorage.getItem('menuCacheTree'));
      }
      return state.menuCacheTree;
    },
    myTags: (state) => {
      if (state.myTags.length == 0) {
        state.myTags = !localStorage.getItem('myTags')
          ? []
          : JSON.parse(localStorage.getItem('myTags'));
      }
      return state.myTags;
    },
    myTagsArray: (state) => {
      if (state.myTagsArray.length == 0) {
        state.myTagsArray = !localStorage.getItem('myTagsArray')
          ? []
          : JSON.parse(localStorage.getItem('myTagsArray'));
      }
      return state.myTagsArray;
    }
  },
  mutations: {
    myMenuOpenKeys(state, data) {
      state.myMenuOpenKeys = data;
      localStorage.setItem('myMenuOpenKeys', JSON.stringify(data));
    },
    myMenuSelectedKeys(state, data) {
      state.myMenuSelectedKeys = data;
      localStorage.setItem('myMenuSelectedKeys', JSON.stringify(data));
    },
    myTagsActiveKey(state, data) {
      state.myTagsActiveKey = data;
      localStorage.setItem('myTagsActiveKey', data);
    },
    myToken(state, data) {
      state.myToken = data;
      localStorage.setItem('myToken', data);
    },
    myUserInfo(state, data) {
      state.myUserInfo = data;
      localStorage.setItem('myUserInfo', JSON.stringify(data));
    },
    isLogin(state, data) {
      state.isLogin = data;
      localStorage.setItem('isLogin', JSON.stringify(data));
    },
    menuCacheTree(state, data) {
      state.menuCacheTree = data;
      localStorage.setItem('menuCacheTree', JSON.stringify(data));
    },

    setMyTags(state, data) {
      localStorage.setItem('myTags', JSON.stringify(data));
      state.myTags = data;
    },
    setMyTagsArray(state, data) {
      localStorage.setItem('myTagsArray', JSON.stringify(data));
      state.myTagsArray = data;
    },
    rightClick(state, curTag) {
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));
      myTagsTemp.forEach((item2) => {
        if (curTag.name == item2.name) {
          item2.show = !item2.show;
        } else {
          item2.show = false;
        }
        //$this.$set(myTagsTemp, index2, item2)
      });
      // state.commit('setMyTags', myTagsTemp)
      // state.commit('setMyTagsArray', myTagsArrayTemp)

      localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
      state.myTags = myTagsTemp;

      localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
      state.myTagsArray = myTagsArrayTemp;
    },

    addMyTags3(state, curTagName) {
      console.log('addMyTags2', curTag);
      let curTag = dynamicRoutesMap[curTagName];
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));

      let inMyTagsIndex = -1;
      myTagsTemp.forEach((item, index) => {
        item.choose = false;
        item.show = false;
        if (item.name == curTag.name) {
          inMyTagsIndex = index;
        }
      });
      //如果这个不是-1，代表当前添加的在这个mytags里面，只需要改变他的选中效果
      if (inMyTagsIndex != -1) {
        myTagsTemp[inMyTagsIndex].choose = true;
        console.log('当前页面在myTags', myTagsTemp[inMyTagsIndex].name);
      } else {
        curTag.choose = true;
        myTagsTemp.push(curTag);
        console.log('当前页面不在在myTags', curTag.name);
      }

      myTagsArrayTemp = [];
      myTagsTemp.forEach((item) => {
        curTag.show = false;
        //$this.$set(myTagsTemp, index, item)
        myTagsArrayTemp.push(item.name);
      });

      localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
      state.myTags = myTagsTemp;

      localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
      state.myTagsArray = myTagsArrayTemp;

      localStorage.setItem('myTagsActiveKey', curTag.name);
      state.myTagsActiveKey = curTag.name;

      localStorage.setItem('myMenuSelectedKeys', JSON.stringify([curTag.name]));
      state.myMenuSelectedKeys = [curTag.name];

      localStorage.setItem('myMenuOpenKeys', JSON.stringify([curTag.path]));
      state.myMenuOpenKeys = [curTag.path];
    },
    /*
     * @Description: 点击菜单栏新增一个页签，如果页签已经有了就自动切换>
     * @Author: 兰雨生
     * @EditTime: 2023-03-24 00:30:18
     * @LastEditors: 兰雨生
     * @LastEditTime: 2023-03-24 00:30:18
     * @Description: 请输入修改的内容,原因等=>
     */
    addMyTags2(state, curTag) {
      console.log('addMyTags2', curTag);
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));

      let inMyTagsIndex = -1;
      myTagsTemp.forEach((item, index) => {
        item.choose = false;
        item.show = false;
        if (item.name == curTag.name) {
          inMyTagsIndex = index;
        }
      });
      //如果这个不是-1，代表当前添加的在这个mytags里面，只需要改变他的选中效果
      if (inMyTagsIndex != -1) {
        myTagsTemp[inMyTagsIndex].choose = true;
        console.log('当前页面在myTags', myTagsTemp[inMyTagsIndex].name);
      } else {
        curTag.choose = true;
        myTagsTemp.push(curTag);
        console.log('当前页面不在在myTags', curTag.name);
      }

      myTagsArrayTemp = [];
      myTagsTemp.forEach((item) => {
        curTag.show = false;
        //$this.$set(myTagsTemp, index, item)
        myTagsArrayTemp.push(item.name);
      });

      localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
      state.myTags = myTagsTemp;

      localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
      state.myTagsArray = myTagsArrayTemp;

      localStorage.setItem('myTagsActiveKey', curTag.name);
      state.myTagsActiveKey = curTag.name;

      localStorage.setItem('myMenuSelectedKeys', JSON.stringify([curTag.name]));
      state.myMenuSelectedKeys = [curTag.name];

      localStorage.setItem('myMenuOpenKeys', JSON.stringify([curTag.path]));
      state.myMenuOpenKeys = [curTag.path];
    },
    /*
     * @Description: 点击菜单栏新增一个页签，如果页签已经有了就自动切换>
     * @Author: 兰雨生
     * @EditTime: 2023-03-24 00:30:18
     * @LastEditors: 兰雨生
     * @LastEditTime: 2023-03-24 00:30:18
     * @Description: 请输入修改的内容,原因等=>
     */
    addMyTags(state, curTag) {
      Nprogress.start();
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));

      let inMyTagsIndex = -1;
      myTagsTemp.forEach((item, index) => {
        item.choose = false;
        item.show = false;
        if (item.name == curTag.name) {
          inMyTagsIndex = index;
        }
      });
      //如果这个不是-1，代表当前添加的在这个mytags里面，只需要改变他的选中效果
      if (inMyTagsIndex != -1) {
        myTagsTemp[inMyTagsIndex].choose = true;
        console.log('当前页面在myTags', myTagsTemp[inMyTagsIndex].name);
      } else {
        curTag.choose = true;
        myTagsTemp.push(curTag);
        console.log('当前页面不在在myTags', curTag.name);
      }

      myTagsArrayTemp = [];
      myTagsTemp.forEach((item) => {
        curTag.show = false;
        //$this.$set(myTagsTemp, index, item)
        myTagsArrayTemp.push(item.name);
      });

      // state.commit('setMyTags', myTagsTemp)
      // state.commit('setMyTagsArray', myTagsArrayTemp)
      // state.commit('myTagsActiveKey', curTag.name)
      // state.commit('myMenuSelectedKeys', [curTag.name])

      localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
      state.myTags = myTagsTemp;

      localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
      state.myTagsArray = myTagsArrayTemp;

      localStorage.setItem('myTagsActiveKey', curTag.name);
      state.myTagsActiveKey = curTag.name;

      localStorage.setItem('myMenuSelectedKeys', JSON.stringify([curTag.name]));
      state.myMenuSelectedKeys = [curTag.name];

      //如果这个不是-1，代表当前添加的在这个mytags里面，只需要改变他的选中效果
      if (inMyTagsIndex != -1) {
        $this.$router.push({
          name: curTag.name
        });
      } else {
        //不在直接刷新跳转
        state.commit('refreshMyTags', curTag);
      }
      Nprogress.done();
    },
    /*
     * @Description: 点击某个页签进行切换，不会刷新当前页面=>
     * @Author: 兰雨生
     * @EditTime: 2023-03-24 00:30:18
     * @LastEditors: 兰雨生
     * @LastEditTime: 2023-03-24 00:30:18
     * @Description: 请输入修改的内容,原因等=>
     */
    changeMyTags(state, curTag) {
      Nprogress.start();
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));
      myTagsTemp.forEach((item) => {
        item.choose = false;
        item.show = false;
        if (item.name == curTag.name) {
          item.choose = true;
        } else {
          item.choose = false;
        }
      });
      // state.commit('setMyTags', myTagsTemp)
      // state.commit('setMyTagsArray', myTagsArrayTemp)
      //
      // //走commit才能持久化
      // // state.myTagsActiveKey = curTag.name
      // state.commit('myTagsActiveKey', curTag.name)
      // state.commit('myMenuSelectedKeys', [curTag.name])

      localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
      state.myTags = myTagsTemp;

      localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
      state.myTagsArray = myTagsArrayTemp;

      localStorage.setItem('myTagsActiveKey', curTag.name);
      state.myTagsActiveKey = curTag.name;

      localStorage.setItem('myMenuSelectedKeys', JSON.stringify([curTag.name]));
      state.myMenuSelectedKeys = [curTag.name];

      $this.$router.push({
        name: curTag.name
      });
      Nprogress.done();
    },
    /*
     * @Description: 右键页签刷新函数=>
     * @Author: 兰雨生
     * @EditTime: 2023-03-24 00:30:18
     * @LastEditors: 兰雨生
     * @LastEditTime: 2023-03-24 00:30:18
     * @Description: 请输入修改的内容,原因等=>
     */
    refreshMyTags(state, curTag) {
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));
      Nprogress.start();
      // let isOwn = curTag.choose;

      let inMyTagsIndex = -1;
      myTagsTemp.forEach((item, index) => {
        item.choose = false;
        item.show = false;
        if (item.name == curTag.name) {
          inMyTagsIndex = index;
        }
      });

      myTagsTemp.splice(inMyTagsIndex, 1);
      //这里是控制keeplive组件和routerview同时销毁，下面马上再次跳转就会重新生成一个没有被keep包裹的组
      myTagsArrayTemp = [];
      myTagsTemp.forEach((item) => {
        myTagsArrayTemp.push(item.name);
      });

      localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
      state.myTags = myTagsTemp;

      localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
      state.myTagsArray = myTagsArrayTemp;

      $this.$router.push({
        name: curTag.name
      });

      setTimeout(function () {
        curTag.choose = true;
        curTag.show = false;
        //这里是控制keeplive组件和routerview同时销毁，下面马上再次跳转就会重新生成一个没有被keep包裹的组件
        myTagsTemp.splice(inMyTagsIndex, 0, curTag);

        myTagsArrayTemp = [];
        myTagsTemp.forEach((item) => {
          myTagsArrayTemp.push(item.name);
        });

        localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
        state.myTags = myTagsTemp;

        localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
        state.myTagsArray = myTagsArrayTemp;
        Nprogress.done();
      }, 20);
    },
    /*
     * @Description: 删除当前页签,如果此页签是最后一个,就往左边一个切换，如果不是最后一个，就往右边切换=>
     * @Author: 兰雨生
     * @EditTime: 2023-03-24 00:30:18
     * @LastEditors: 兰雨生
     * @LastEditTime: 2023-03-24 00:30:18
     * @Description: 请输入修改的内容,原因等=>
     */
    deleteCurMyTag(state, curTag) {
      let inMyTagsIndex = -1;

      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));
      myTagsTemp.forEach((item, index) => {
        item.choose = false;
        item.show = false;
        if (item.name == curTag.name) {
          inMyTagsIndex = index;
        }
      });
      console.log('inMyTagsIndex', inMyTagsIndex);

      if (inMyTagsIndex == myTagsTemp.length - 1) {
        if (inMyTagsIndex == 0) {
          state.commit('refreshMyTags', myTagsTemp[inMyTagsIndex]);
        } else {
          state.commit('refreshMyTags', myTagsTemp[inMyTagsIndex - 1]);
        }
      } else {
        state.commit('refreshMyTags', myTagsTemp[inMyTagsIndex + 1]);
      }
      if (myTagsTemp.length != 1) {
        myTagsTemp = myTagsTemp.filter((item) => {
          return item.name != curTag.name;
        });
      }

      setTimeout(function () {
        console.log('deleteCurMyTag.myTagsTemp', myTagsTemp);
        state.commit('setMyTags', myTagsTemp);
        state.commit('setMyTagsArray', myTagsArrayTemp);
        console.log(
          'myTagsTemp[myTagsTemp.length - 1]',
          myTagsTemp[myTagsTemp.length - 1]
        );

        state.commit('myTagsActiveKey', myTagsTemp[myTagsTemp.length - 1].name);
        state.commit('myMenuSelectedKeys', [
          myTagsTemp[myTagsTemp.length - 1].name
        ]);

        localStorage.setItem('myTags', JSON.stringify(myTagsTemp));
        state.myTags = myTagsTemp;

        localStorage.setItem('myTagsArray', JSON.stringify(myTagsArrayTemp));
        state.myTagsArray = myTagsArrayTemp;

        localStorage.setItem(
          'myTagsActiveKey',
          myTagsTemp[myTagsTemp.length - 1].name
        );
        state.myTagsActiveKey = myTagsTemp[myTagsTemp.length - 1].name;

        localStorage.setItem(
          'myMenuSelectedKeys',
          JSON.stringify([myTagsTemp[myTagsTemp.length - 1].name])
        );
        state.myMenuSelectedKeys = [myTagsTemp[myTagsTemp.length - 1].name];
      }, 30);
    },
    /*
     * @Description: 删除其他tage页签,保留当前页签=>
     * @Author: 兰雨生
     * @EditTime: 2023-03-24 00:30:18
     * @LastEditors: 兰雨生
     * @LastEditTime: 2023-03-24 00:30:18
     * @Description: 请输入修改的内容,原因等=>
     */
    deleteOtherMyTags(state, curTag) {
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));
      myTagsTemp = myTagsTemp.filter((item) => {
        return item.name == curTag.name;
      });

      state.commit('setMyTags', myTagsTemp);
      state.commit('setMyTagsArray', myTagsArrayTemp);

      state.commit('refreshMyTags', curTag);
    },
    /*
     * @Description: 关闭所有页签，保留第一页签，并且刷新第一个页签=>
     * @Author: 兰雨生
     * @EditTime: 2023-03-24 00:30:18
     * @LastEditors: 兰雨生
     * @LastEditTime: 2023-03-24 00:30:18
     * @Description: 请输入修改的内容,原因等=>
     */
    deleteAllMyTags(state) {
      let myTagsTemp = JSON.parse(JSON.stringify(state.myTags));
      let myTagsArrayTemp = JSON.parse(JSON.stringify(state.myTagsArray));
      myTagsTemp = myTagsTemp.filter((item, index) => {
        return index == 0;
      });
      state.commit('setMyTags', myTagsTemp);
      state.commit('setMyTagsArray', myTagsArrayTemp);

      state.commit('refreshMyTags', myTagsTemp[0]);
    }
  },
  actions: {
    //登录
    login: async (store, data) => {
      let loginResp = await login(data);
      store.commit('myToken', loginResp.token);
      let getUserInfoResp = await getUserInfo();

      store.commit('myUserInfo', getUserInfoResp);
      store.commit('isLogin', true);
      store.commit('myTags', []);
      store.commit('myTagsArray', []);
      store.commit('myTagsActiveKey', null);
      store.commit('myMenuSelectedKeys', []);
      store.commit('myMenuOpenKeys', []);

      // //  let adminLoginResp = await adminLogin(data);
      // let adminLoginResp = data;
      // //登录
      // // let resp = await umsAdminBase_login(data);
      //
      // // commit("myToken", resp.data.token);
      // //活动用户信息
      // // resp = await umsAdminBase_getUserInfo({});
      // // commit("myUser", resp.data);
      // // commit("isLogin", true);
      // store.commit("isLogin", true);
      // store.commit("myUserInfo", adminLoginResp.data);
      // store.commit("myToken", adminLoginResp.data.token);
      //
      // // let menuCacheTreeResp = await menuCacheTree()
      // let menuCacheTreeResp = {}
      // store.commit("menuCacheTree", menuCacheTreeResp.data);
      //
      // return "123";
      // localStorage.setItem("menuCacheTreeResp", JSON.stringify(menuCacheTreeResp.data))
      //Promise.reject(adminLoginResp)

      // return adminLoginResp;
    },
    loginout: ({ commit }) => {
      // commit("myUser", null);
      commit('myToken', null);
      commit('myUserInfo', null);
      commit('isLogin', false);
      commit('myTags', []);
      commit('myTagsArray', []);
      commit('myTagsActiveKey', null);
      commit('myMenuSelectedKeys', []);
      commit('myMenuOpenKeys', []);

      // commit("isLogin", false);
    },
    myTags: ({ commit }, data) => {
      commit('myTags', data);
      commit('myTagsArray', data);
      // commit("isLogin", false);
    },
    myTagsByIndex: ({ commit }, data) => {
      // commit("myUser", null);
      commit('myTagsByIndex', data);
      commit('myTagsArray', data);
      // commit("isLogin", false);
    },

    deleteMyTags: ({ commit }, data) => {
      commit('deleteMyTags', data);
      commit('myTagsArray', data);
    }
  },
  modules: {}
});
