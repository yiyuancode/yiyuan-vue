<template>
  <div>
    <y-search
      :columns="table.columns"
      :loading="table.loading"
      :scopedSlots="['tenantId']"
      @search="search"
    >
      <a-form-model-item
        slot="tenantId"
        slot-scope="{ form }"
        label="商户"
        prop="tenantId"
      >
        <y-shop-select :key="form.tenantId" v-model="form.tenantId" />
      </a-form-model-item>
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
      <div slot="operations" class="y-flex">
        <a-button icon="plus" type="primary" @click="onAdd"> 新建</a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          cancel-text="取消"
          ok-text="确认"
          title="是否要批量删除这些信息?"
          @confirm="onBatchDelete"
        >
          <a-button :disabled="uBatchDisabled" icon="delete" type="danger">
            批量删除
          </a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
      </div>

      <a-form-model-item
        slot="tenantId"
        slot-scope="{ form }"
        label="商户"
        prop="tenantId"
      >
        <y-shop-select v-model="form.tenantId" isSpan />
      </a-form-model-item>

      <div slot="isPackage" slot-scope="{ text, record }" class="y-flex">
        {{ enumsMap['isPackage' + text] }}
      </div>

      <div slot="isShow" slot-scope="{ text, record }" class="y-flex">
        {{ enumsMap['isShow' + text] }}
      </div>

      <div slot="action" slot-scope="{ text, record }" class="y-flex">
        <a-button icon="edit" @click="onEdit(record)"></a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="'确定删除此条数据吗?'"
          cancel-text="取消"
          ok-text="确定"
          @confirm="() => onDelete(record)"
        >
          <a-button icon="delete" type="danger"></a-button>
        </a-popconfirm>
      </div>
    </y-table>

    <edit
      :key="editId"
      :columns="table.columns"
      :editConfigProps="editConfigProps"
      :editId="editId"
      @ok="getData"
    >
    </edit>
  </div>
</template>
<script>
import { columns, enumsMap } from './pageConfig.js';
import {
  deleteFreightTempPrice as deletePost,
  getFreightTempPricePageList as pageGet
} from '@/api/ftm/freightTempPrice.js';
import edit from './edit.vue';

export default {
  components: { edit },
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
        title: '物流模板价格管理',
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
