//引入
import yImg from '@/components/yImg/index.vue';
import ySearch from '@/components/ySearch/index.vue';
import yTable from '@/components/yTable/index.vue';
import yProductCategoryTreeSelect from '@/components/yProductCategoryTreeSelect/index.vue';
import yAreaSelect from '@/components/yAreaSelect/index.vue';
import draggable from 'vuedraggable';

export default {
  install(Vue) {
    //注册全局组件
    Vue.component('yImg', yImg);
    Vue.component('ySearch', ySearch);
    Vue.component('yTable', yTable);
    Vue.component('yProductCategoryTreeSelect', yProductCategoryTreeSelect);
    Vue.component('yAreaSelect', yAreaSelect);
    Vue.component('draggable', draggable);

  }
};
