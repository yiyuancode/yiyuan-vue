<template>
  <div>
    <y-search
      :columns="table.columns"
      :loading="table.loading"
      :scopedSlots="[]"
      @search="search"
    >
    </y-search>
    <y-table
      :columns="table.columns"
      :loading="table.loading"
      :pagination="table.pagination"
      :records="table.records"
      :row-selection="table.rowSelection"
      rowKey="id"
      @change="tableChange"
    >
      <!-- 积分类型 -->
      <div slot="type" slot-scope="{ text, record }" class="y-flex">
        <span v-if="text==1">签到积分</span>
      </div>
    </y-table>
  </div>
</template>
<script>
import { columns, enumsMap } from './pageConfig.js';
import {
  deleteIntegral as deletePost,
  getIntegralPageList as pageGet
} from '@/api/um/integral.js';

export default {
  data() {
    return {
      enumsMap,
      table: {
        columns,
        records: [],
        loading: false,
        pagination: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pageSizeOptions: ['10', '20', '30', '40'],
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条` // 显示总条数和当前数据范围
        },
        rowSelection: {
          selectedRowKeys: [],
          onChange: this.tableSelectedRowKeys
        }
      },
      editConfigProps: {
        visible: false,
        title: '积分管理',
        columns
      },
      editId: null
    };
  },
  computed: {
    uBatchDisabled() {
      return this.table.rowSelection.selectedRowKeys.length == 0;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    search(form) {
      this.searchForm = form;
      this.getData();
    },
    tableSelectedRowKeys(selectedRowKeys) {
      this.table.rowSelection.selectedRowKeys = selectedRowKeys;
    },
    tableChange(pagination) {
      this.table.pagination = pagination;
      this.getData();
    },
    async getData() {
      this.table.loading = true;
      let { pageNum, pageSize } = this.table.pagination;
      let { records, total, current } = await pageGet({
        pageNum: pageNum,
        pageSize: pageSize,
        ...this.searchForm
      });
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    },
    async onRowChange(record) {
      await this.getData();
    },
    onAdd() {
      this.editId = null;
      this.editConfigProps.visible = true;
    },
    async onDelete(record) {
      let ids = record.id;
      await deletePost(ids);
      await this.beforeDelete(ids);
      await this.getData();
    },
    async onBatchDelete() {
      let ids = this.table.rowSelection.selectedRowKeys.join(',');
      this.table.rowSelection.selectedRowKeys = [];
      await deletePost(ids);
      await this.beforeDelete(ids);
      await this.getData();
    },
    async beforeDelete(ids) {
      this.table.records = this.table.records.filter((item) => {
        return ids.indexOf(item.id) == -1;
      });
      if (this.table.records.length == 0 && this.table.pagination.pageNum > 1) {
        this.table.pagination.pageNum = this.table.pagination.pageNum - 1;
      }
    },

    onEdit(record) {
      this.editId = record.id;
      this.editConfigProps.visible = true;
    }
  }
};
</script>
