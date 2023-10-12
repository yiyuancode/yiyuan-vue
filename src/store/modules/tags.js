export default {
  namespaced: true,
  state: {
    myTags: [],
    curTags: null,
    openMenuKeys: [],
    selectMenuKey: []

  },
  getters: {
    myTags: (state) => {
      state.myTags = !localStorage.getItem("myTags") ? [] : JSON.parse(localStorage.getItem("myTags"));
      return state.myTags;
    },
    curTags: (state) => {
      state.curTags = !localStorage.getItem("curTags") ? [] : JSON.parse(localStorage.getItem("curTags"));
      return state.curTags;
    },
    hasTagsName: (state) => (name) => {
      let myTags = !localStorage.getItem("myTags") ? [] : JSON.parse(localStorage.getItem("myTags"));
      state.myTags = myTags;
      const nameArray = myTags.map(obj => obj.name);
      const hasTagsName = nameArray.includes(name);

      return hasTagsName
    },
    isTagsAlive: () => (name) => {
      let curTags = !localStorage.getItem("curTags") ? [] : JSON.parse(localStorage.getItem("curTags"));
      return name == curTags.name;
    },
    openMenuKeys: (state) => {
      state.openMenuKeys = !localStorage.getItem("openMenuKeys") ? [] : JSON.parse(localStorage.getItem("openMenuKeys"));
      return state.openMenuKeys;
    },
    selectMenuKey: (state) => {
      // state.selectMenuKey = !localStorage.getItem("selectMenuKey") ? [] : JSON.parse(localStorage.getItem("selectMenuKey"));
      // return state.selectMenuKey;
      return [state.curTags.name]
    },

  },
  mutations: {

    myTags(state, data) {
      state.myTags = data;
      localStorage.setItem("myTags", JSON.stringify(data))
    },
    addMyTags(state, data) {
      let myTags = !localStorage.getItem("myTags") ? [] : JSON.parse(localStorage.getItem("myTags"));
      myTags.push(data);
      state.myTags = myTags
      localStorage.setItem("myTags", JSON.stringify(myTags))
    },
    curTags(state, data) {
      state.curTags = data;
      localStorage.setItem("curTags", JSON.stringify(data))
    },
    openMenuKeys(state, data) {
      state.openMenuKeys = data;
      localStorage.setItem("openMenuKeys", JSON.stringify(data))
    },
    selectMenuKey(state, data) {
      state.selectMenuKey = data;
      localStorage.setItem("selectMenuKey", JSON.stringify(data))
    },

  },
  actions: {
    //登录
    add: async (store, data) => {
      //删除这个箭头函数不然json转化会报错
      // delete data.component;
      store.commit("addMyTags", data);
      store.commit("curTags", data);
    },
    change: async (store, data) => {
      store.commit("curTags", data);
    },
    del: async (store, data) => {
      // store.commit("curTags", data);
      let targetObject = {};
      //获取当前要删除的索引
      let myTags = store.state.myTags
      const targetIndex = myTags.findIndex(obj => obj == data);
      if (targetIndex == myTags.length - 1) {
        targetObject = myTags[myTags.length - 2]
      } else {
        targetObject = myTags[myTags.length + 2]
      }

      store.commit("curTags", targetObject);
      const filteredObjects = myTags.filter(obj => obj != data);

      store.commit("myTags", filteredObjects);
    },
    delOther: async (store, data) => {
      //获取当前要删除的索引
      let myTags = store.state.myTags
      const filteredObjects = myTags.filter(obj => obj == data);
      store.commit("myTags", filteredObjects);
    },
    delLeft: async (store, data) => {
      //获取当前要删除的索引
      let myTags = store.state.myTags
      const index = myTags.findIndex(obj => obj.name == data.name);
      if (index == 0) {
        return; // 如果找不到匹配的name，则返回原始数组
      }
      myTags=myTags.filter((_, i) => i >= index);
      store.commit("myTags", myTags);

    },
    delRight: async (store, data) => {
      //获取当前要删除的索引
      let myTags = store.state.myTags
      const index = myTags.findIndex(obj => obj.name == data.name);
      if (index == myTags.length - 1) {
        return; // 如果找不到匹配的name，则返回原始数组
      }
      myTags=myTags.filter((_, i) => i <= index);
      store.commit("myTags", myTags);
    },
    delByName: async (store, data) => {
      // store.commit("curTags", data);
      let targetObject = {};
      //获取当前要删除的索引
      let myTags = store.state.myTags
      const targetIndex = myTags.findIndex(obj => obj.name == data);
      if (targetIndex == myTags.length - 1) {
        targetObject = myTags[myTags.length - 2]
      } else {
        targetObject = myTags[myTags.length + 2]
      }

      store.commit("curTags", targetObject);
      const filteredObjects = myTags.filter(obj => obj.name != data);

      store.commit("myTags", filteredObjects);
    },
    loginout: ({
                 commit
               }) => {
      commit('myTags', []);
      commit('curTags', null);
      commit('openMenuKeys', []);
      commit('selectMenuKey', []);

    },

  }
}
