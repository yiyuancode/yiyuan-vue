<template>
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    @onChange="tableChangeHandle"
    @onDelete="deleteHandle"
    @onReset="resetHandle"
    @onSave="saveHandle"
    @onSearch="searchHandle"
    @onSubmit="submitHandle"
  >

  </ManagePage>
</template>

<script>
  import ManagePage from '@/components/manage/ManagePage.vue';
  import manage from '@/mixins/manage';
  import {columns, moduleConfig, permissionObj} from './pageConfig';

  export default {
    name: "freightTempPrice",
    components: {
      ManagePage
    },
    mixins: [manage({permissionObj})],
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
