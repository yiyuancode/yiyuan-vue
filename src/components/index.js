//引入
import yImg from '@/components/yImg/index.vue';
import ySearch from '@/components/ySearch/index.vue';
import yTable from '@/components/yTable/index.vue';

import yAreaSelect from '@/components/yAreaSelect/index.vue';
import yShopSelect from '@/components/yShopSelect/index.vue';
import draggable from 'vuedraggable';
import yPlatCategorySelect from '@/components/yPlatCategorySelect/index.vue';
import yShopCategorySelect from '@/components/yShopCategorySelect/index.vue';
import yProductCategorySelect from '@/components/yProductCategorySelect/index.vue';

import yRichEditor from '@/components/yRichEditor/index.vue';
import yUploadMultiple from '@/components/yUploadMultiple/index.vue';
import yUploadSingle from '@/components/yUploadSingle/index.vue';
import {Cascader} from 'element-ui';

export default {
  install(Vue) {
    //注册全局组件
    Vue.component('yImg', yImg);
    Vue.component('ySearch', ySearch);
    Vue.component('yTable', yTable);
    Vue.component('yAreaSelect', yAreaSelect);
    Vue.component('yShopSelect', yShopSelect);
    Vue.component('draggable', draggable);
    Vue.component('yPlatCategorySelect', yPlatCategorySelect);
    Vue.component('yShopCategorySelect', yShopCategorySelect);
    Vue.component('yRichEditor', yRichEditor);
    Vue.component('yUploadMultiple', yUploadMultiple);
    Vue.component('yUploadSingle', yUploadSingle);
    Vue.component('yProductCategorySelect', yProductCategorySelect);

    Vue.component(Cascader.name, Cascader);

  }
};
