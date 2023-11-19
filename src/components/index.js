//引入
import yImg from '@/components/yImg/index.vue';
import ySearch from '@/components/ySearch/index.vue';
import yTable from '@/components/yTable/index.vue';

import yAreaSelect from '@/components/yAreaSelect/index.vue';
import yShopSelect from '@/components/yShopSelect/index.vue';
import draggable from 'vuedraggable';
import yPlatCategorySelect from '@/components/yPlatCategorySelect/index.vue';
import yProductCategorySelectOfShop from '@/components/yProductCategorySelectOfShop/index.vue';
import yProductCategorySelect from '@/components/yProductCategorySelect/index.vue';
import yShopTypeSelect from '@/components/yShopTypeSelect/index.vue';
import yRichEditor from '@/components/yRichEditor/index.vue';
import yDateRingePicker from '@/components/yDateRingePicker/index.vue';
import yUploadMultiple from '@/components/yUploadMultiple/index.vue';
import yUploadSingle from '@/components/yUploadSingle/index.vue';
import {Cascader, Select} from 'element-ui';
import yEditForm from '@/components/yEditForm/index.vue';
import yFreightTempPriceTable from '@/components/yFreightTempPriceTable/index.vue';
import yAreaMultipleCascader from '@/components/yAreaMultipleCascader/index.vue';
import yBooleanSpan from '@/components/yBooleanSpan/index.vue';
import yFreightTempSelect from '@/components/yFreightTempSelect/index.vue';
import yEnumSpan from '@/components/yEnumSpan/index.vue';
import yProductGuaranteeSelect from '@/components/yProductGuaranteeSelect/index.vue';


import yProductCategoryPlatSelect from '@/components/business/yProductCategoryPlatSelect/index.vue';
import yProductCategoryShopSelect from '@/components/business/yProductCategoryShopSelect/index.vue';


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
    Vue.component('yProductCategorySelectOfShop', yProductCategorySelectOfShop);
    Vue.component('yRichEditor', yRichEditor);
    Vue.component('yUploadMultiple', yUploadMultiple);
    Vue.component('yUploadSingle', yUploadSingle);
    Vue.component('yProductCategorySelect', yProductCategorySelect);
    Vue.component('yDateRingePicker', yDateRingePicker);
    Vue.component('yEditForm', yEditForm);
    Vue.component('yFreightTempPriceTable', yFreightTempPriceTable);
    Vue.component('yAreaMultipleCascader', yAreaMultipleCascader);
    Vue.component('yBooleanSpan', yBooleanSpan);
    Vue.component('yFreightTempSelect', yFreightTempSelect);
    Vue.component('yEnumSpan', yEnumSpan);
    Vue.component('yShopTypeSelect', yShopTypeSelect);
    Vue.component('yProductGuaranteeSelect', yProductGuaranteeSelect);

    //平台商品分类选择组件
    Vue.component('yProductCategoryPlatSelect', yProductCategoryPlatSelect);
    //店铺商品分类选择组件
    Vue.component('yProductCategoryShopSelect', yProductCategoryShopSelect);
    Vue.component(Cascader.name, Cascader);
    Vue.component(Select.name, Select);

  }
};
