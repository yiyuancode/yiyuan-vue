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
  </ManagePage>
</template>

<script>
import ManagePage from '@/components/manage/ManagePage.vue';
import manage from '@/mixins/manage';
import { columns, moduleConfig, permissionObj } from './pageConfig';

export default {
  name: 'ActivitiyProduct',
  components: {
    ManagePage
  },
  mixins: [manage({ permissionObj })],
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
