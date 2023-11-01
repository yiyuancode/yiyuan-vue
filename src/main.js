import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './theme/index.less';
import Antd from 'ant-design-vue';
import Viser from 'viser-vue';
// import '@/mock';
import store from './store';
import 'animate.css/source/animate.css';
import Plugins from '@/plugins';
// import { initI18n } from '@/utils/i18n';
import 'moment/locale/zh-cn';
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view';
import addFrom from '@/mixins/addFrom.js';
import mixin from '@/mixins/index.js';
//在main.js引入qs
import qs from 'qs';
/*引入图片预览组件,api得方式*/
import hevueImgPreview from 'hevue-img-preview';
import 'hevue-img-preview/css/theme-light.css';
import '@/assets/common.less';
import install from '@/components/index.js';
import './assets/element-variables.scss'

Vue.use(hevueImgPreview, {
  keyboard: true,
  clickMaskCLose: true
});

Vue.use(dataV);

Vue.use(addFrom);

Vue.use(mixin);

//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象

Vue.prototype.$qs = qs;

// import LoadingDirective from '@/directives/loading';
// const router = initRouter(store.state.setting.asyncRoutes);
// const i18n = initI18n('CN', 'US');

Vue.use(Antd);
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Plugins);
// Vue.directive("loading", LoadingDirective);

// bootstrap({ router, store, i18n, message: Vue.prototype.$message });
Vue.use(install);
export default new Vue({
  router,
  store,
  // router,
  // store,
  // i18n,
  render: (h) => h(App)
}).$mount('#app');
