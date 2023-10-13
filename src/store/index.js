import Vue from 'vue';
import Vuex from 'vuex';
import { gertVuexStore } from '@/utils/autoRouterUtil.js';
//自动扫描vuex文件分模块
let modules = gertVuexStore(require.context('./modules', false, /\.js$/));
console.log('modules', modules);
Vue.use(Vuex);
const store = new Vuex.Store({ modules });

export default store;
