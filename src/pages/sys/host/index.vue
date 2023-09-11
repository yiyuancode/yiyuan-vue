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
    @onOtherEventChange="otherEventChangeHandle"
  >
    <!-- 其他的操作插槽 -->
    <!-- <template slot="otherOperationsContainer" slot-scope="{record}">
      <a-button type="primary" @click="toHostMonitor(record)">监控</a-button>
    </template> -->
  </ManagePage>
</template>

<script>
import ManagePage from '@/components/manage/ManagePage.vue';
import manage from '@/mixins/manage';
import { columns, moduleConfig, permissionObj, renderObj } from './pageConfig';

export default {
  components: {
    ManagePage
  },
  mixins: [manage({ permissionObj, renderObj })],
  data() {
    return {
      columns,
      ...moduleConfig,
      submitModalObj: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      }
    };
  },
  methods: {
    toHostMonitor(record) {
      this.$router.push({
        path: '/sys/hostMonitor',
        query: { id: record.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
