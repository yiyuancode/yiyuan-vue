<template>
  <div>
    <y-search
      :columns="table.columns"
      :scopedSlots="['username', 'phone', 'sex']"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item slot="username" slot-scope="{ form }" label="姓名">
        <a-input v-model="form.username" allowClear placeholder="请输入姓名" />
      </a-form-model-item>
      <a-form-model-item slot="phone" slot-scope="{ form }" label="手机">
        <a-input v-model="form.phone" allowClear placeholder="请输入手机" />
      </a-form-model-item>
      <a-form-model-item slot="sex" slot-scope="{ form }" label="性别">
        <a-input v-model="form.sex" allowClear placeholder="请输入性别" />
      </a-form-model-item>
    </y-search>
    <y-table
      rowKey="id"
      :columns="table.columns"
      :records="table.records"
      :pagination="table.pagination"
      :row-selection="table.rowSelection"
      :loading="table.loading"
      @change="tableChange"
    >
      <span slot="isShow" slot-scope="{ text, record }">
        <a-switch
          v-model="record.isShow"
          checked-children="是"
          un-checked-children="否"
          @change="(checked) => onRowChange({ ...record, isShow: checked })"
        />
      </span>
      <span slot="createTime" slot-scope="{ text, record }"> </span>
      <div slot="action" slot-scope="{ text, record }" class="y-flex">
        <a-button icon="edit"></a-button>
        <a-divider type="vertical" />
        <a-button type="danger" icon="delete"></a-button>
      </div>
    </y-table>
  </div>
</template>
<script>
import { columns } from '@/pages/mam/activitiy/pageConfig.js';
import { editActivitiy, getActivitiyPageList } from '@/api/mam/activitiy.js';

export default {
  data() {
    return {
      searchForm: {},
      table: {
        columns,
        records: [],
        loading: false,
        pagination: {
          pageNum: 1,
          pageSize: 2,
          total: 0,
          pageSizeOptions: ['2', '20', '30', '40'],
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条` // 显示总条数和当前数据范围
        },
        rowSelection: {
          selectedRowKeys: [],
          onChange: this.tableSelectedRowKeys
        }
      }
    };
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
      console.log('tableSelectedRowKeys', selectedRowKeys);
      this.table.rowSelection.selectedRowKeys = selectedRowKeys;
    },
    tableChange(pagination, log) {
      this.table.pagination = pagination;
      this.getData();
    },
    async getData() {
      this.table.loading = true;
      let { pageNum, pageSize } = this.table.pagination;
      let { records, total, current } = await getActivitiyPageList({
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
      await editActivitiy(record, record.id);
      await this.getData();
    }
  }
};
</script>
