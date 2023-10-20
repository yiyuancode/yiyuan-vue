<template>
  <div>
    <y-search
      :columns="table.columns"
      :scopedSlots="3"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item
        slot="scopedSlots-0"
        slot-scope="{ form }"
        label="姓名"
      >
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item
        slot="scopedSlots-1"
        slot-scope="{ form }"
        label="手机"
      >
        <a-input v-model="form.phone" />
      </a-form-model-item>
      <a-form-model-item
        slot="scopedSlots-2"
        slot-scope="{ form }"
        label="性别"
      >
        <a-input v-model="form.sex" />
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
      <span slot="isShow" slot-scope="{ text, record }"></span>
      <span slot="createTime" slot-scope="{ text, record }"> </span>
      <span slot="action" slot-scope="{ text, record }">
        <a-button icon="edit" @click="reloadTableSelectedRowKeys"> </a-button>
        <a-divider type="vertical" />
        <a-button type="danger" icon="delete"> </a-button>
      </span>
    </y-table>
  </div>
</template>
<script>
import { columns } from '@/pages/mam/activitiy/pageConfig.js';
import { getActivitiyPageList } from '@/api/mam/activitiy.js';

export default {
  data() {
    return {
      // form: {
      //   name: "",
      //   phone: "",
      //   sex: "",
      // },
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
    reloadTableSelectedRowKeys() {
      console.log('reloadTableSelectedRowKeys');
      this.table.rowSelection.selectedRowKeys = [];
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
      // this.table = {
      //   ...this.table,
      //   records,
      //   pagination: {
      //     ...this.table.pagination,
      //     total,
      //     current
      //   }
      // }
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    }
  }
};
</script>
