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
    <!-- 其他的操作插槽 -->
    <!-- <template slot="otherOperationsContainer" slot-scope="{record}">
      <a-button type="primary" @click="toMonitor(record)">监控</a-button>
    </template> -->
  </ManagePage>
</template>

<script>
import ManagePage from '@/components/manage/ManagePage.vue';
import manage from '@/mixins/manage';
import { columns, moduleConfig, permissionObj } from './pageConfig';

export default {
  name: 'Redis',
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

  methods: {
    toMonitor(record) {
      this.$router.push({
        path: '/sys/redisMonitor',
        query: { id: record.data.id }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
