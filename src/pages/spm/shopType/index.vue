<template>

  <div>
    <y-search :scopedSlots="3" :loading="table.loading" @search="search">
      <a-form-model-item slot="scopedSlots-1" label="店铺ID">
        <a-input
          v-model="searchForm.name"
          placeholder="搜索店铺ID"
          allowClear
        />
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
      <div slot="operations">
        <a-button type="primary" icon="plus" @click="addForm"> 新建</a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="'确定批量删除选中的分类'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => onBatchDelete()"
        >
          <a-button :disabled="table.rowSelection.selectedRowKeys.length <= 0">
            批量删除
          </a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
      </div>
    </y-table>
    <a-drawer
      :title="editConfig.title"
      width="500"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <edit
        v-if="editConfig.visible"
        :editId="editConfig.editId"
        @onSaveSubmit="onEditSubmit"
        @onCancelSubmit="editConfig.visible = false"
      ></edit>
    </a-drawer>
  </div>
</template>

<script>
import { columns } from './pageConfig';
import { getShopTypePageList } from '@/api/spm/shopType';
import edit from './edit.vue';
export default {
  components: {edit},
  data() {
    return {
      searchForm: {
        name: ''
      },
      table: {
        loading: false,
        columns,
        records: [],
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
      editConfig: {
          editId: null,
          visible: false,
          title:null
        },
      columns,
    };
  },
  created() {
    this.getData();
  },

  methods: {
    addForm() {
      this.editConfig.visible=true;
      this.editConfig.title="添加店铺类型"
    },
    search(form) {
      this.searchForm = form;
    },
    async getData() {
      this.table.loading = true;
      let { pageNum, pageSize } = this.table.pagination;
      let { records, total, current } = await getShopTypePageList({
        pageNum: pageNum,
        pageSize: pageSize,
        ...this.searchForm
      });
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
