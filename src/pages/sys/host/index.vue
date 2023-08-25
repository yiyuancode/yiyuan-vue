<template>
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    :submitModalObj="submitModalObj"
    @onDelete="deleteHandle"
    @onReset="resetHandle"
    @onSave="saveHandle"
    @onSearch="searchHandle"
    @onSubmit="submitHandle"
  >
    <!-- 其他的操作插槽 -->
    <template #otherOperationsContainer>
      <!-- #otherOperationsContainer="scope" -->
      <a-button type="primary">监控</a-button>
    </template>
  </ManagePage>
</template>

<script>
import ManagePage from '@/components/manage/ManagePage.vue';
import manage from '@/mixins/manage';
import { columns, moduleConfig } from './pageConfig';

export default {
  components: {
    ManagePage
  },
  mixins: [manage()],
  data() {
    return {
      columns,
      ...moduleConfig,
      submitModalObj: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
