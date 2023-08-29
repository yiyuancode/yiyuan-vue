import Vue from 'vue';
import App from './App.vue';
import {initRouter} from './router';
import './theme/index.less';
import Antd from 'ant-design-vue';
import Viser from 'viser-vue';
// import '@/mock';
import store from './store';
import 'animate.css/source/animate.css';
import Plugins from '@/plugins';
import {initI18n} from '@/utils/i18n';
import bootstrap from '@/bootstrap';
import 'moment/locale/zh-cn';


import addFrom from '@/mixins/addFrom.js';
//在main.js引入qs
import qs from 'qs';

Vue.use(addFrom);
//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象

Vue.prototype.$qs = qs;


// import LoadingDirective from '@/directives/loading';
const router = initRouter(store.state.setting.asyncRoutes);
const i18n = initI18n('CN', 'US');

Vue.use(Antd);
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Plugins);
// Vue.directive("loading", LoadingDirective);

bootstrap({router, store, i18n, message: Vue.prototype.$message});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
