<template>
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    @onSave="saveHandle"
    @onSubmit="submitHandle"
    @onDelete="deleteHandle"
    @onSearch="searchHandle"
    @onReset="resetHandle"
    @onChange="tableChangeHandle"
  >
<!--    table- 是因为manage组建插槽为了有区分，添加了table前缀-->
    <span slot="table-isShow" slot-scope="text">{{ text.record.isShow ? '显示':'不显示' }}</span>
  </ManagePage>
</template>

<script>
import ManagePage from '@/components/manage/ManagePage.vue';
import manageProductAttrKeyValue from '@/mixins/manage_product_attr_key.js';
import { columns, moduleConfig, permissionObj } from './pageConfig';

export default {
  name: 'ProductAttrValue',
  components: {
    ManagePage
  },
  mixins: [manageProductAttrKeyValue({ permissionObj })],
  data() {
    return {
      columns,
      ...moduleConfig
    };
  },

  methods: {}
};
</script>

<style lang="less" scoped></style>
