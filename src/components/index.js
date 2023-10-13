//引入
import yImg from '@/components/yImg/index.vue';

export default {
  install(Vue) {
    //注册全局组件
    Vue.component('yImg', yImg);
  }
};
