<template>
  <div>
    <y-search
      :scopedSlots="['platform', 'username']"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item slot="platform" slot-scope="{ form }" label="平台类型">
        <!-- <a-input v-model="form.platform" placeholder="请选择" allowClear /> -->
        <a-select v-model="form.platform" allowClear placeholder="选择平台类型">
          <a-select-option :value="0"> 平台端</a-select-option>
          <a-select-option :value="1"> 租户端</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item slot="username" slot-scope="{ form }" label="用户名">
        <a-input
          v-model="form.username"
          allowClear
          placeholder="用户名"
        ></a-input>
      </a-form-model-item>

      <a-form-model-item slot="username" slot-scope="{ form }" label="用户名">
        <a-input
          v-model="form.username"
          allowClear
          placeholder="用户名"
        ></a-input>
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
        <a-button type="primary" icon="plus" @click="onAdd"> 新建</a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="'确定批量删除选中的用户'"
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

      <span slot="platform" slot-scope="{ text, record }">
        {{ text.desc }}
      </span>

      <div slot="operation" slot-scope="{ text, record }" class="y-flex">
        <a-button-group>
          <!--            编辑用户-->
          <a-button
            icon="edit"
            shape="round"
            @click="() => onEdit(text, record)"
          ></a-button>
          <!--            删除用户-->
          <a-popconfirm
            :title="'确定删除名称为【' + record.username + '】的用户'"
            ok-text="确定"
            cancel-text="取消"
            @confirm="() => onDelete(record)"
          >
            <a-button icon="delete" type="danger" shape="round"></a-button>
          </a-popconfirm>
        </a-button-group>
      </div>
    </y-table>

    <!--    商品属性编辑-->
    <a-drawer
      title="用户管理"
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
import { columns } from './pageConfig.js';
import { deleteUser, getUserPageList } from '@/api/sys/user.js';

import edit from './edit.vue';

export default {
  components: { edit },
  data() {
    return {
      searchForm: {},
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
      // 商品类型父级选择框下拉数据
      searchDataOfProductCate: [],
      editConfig: {
        editId: null,
        visible: false
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
      if (this.table.records.length == 0 && this.table.pagination.pageNum > 1) {
        this.table.pagination.pageNum = this.table.pagination.pageNum - 1;
      }
      let { pageNum, pageSize } = this.table.pagination;
      let { records, total, current } = await getUserPageList({
        pageNum: pageNum,
        pageSize: pageSize,
        ...this.searchForm
      });
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    },

    // 新增用户
    onAdd() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    // 批量删除用户
    async onBatchDelete() {
      console.log(
        'onBatchDelete.selectedRowKeys',
        this.table.rowSelection.selectedRowKeys
      );
      await deleteUser(this.table.rowSelection.selectedRowKeys.join(','));
      this.$message.success(`批量删除用户成功`);
      this.table.records = this.table.records.filter(
        (item) => !this.table.rowSelection.selectedRowKeys.includes(item.id)
      );
      this.table.rowSelection.selectedRowKeys = [];
      this.getData();
    },
    // 用户编辑后提交事件
    onEditSubmit() {
      this.editConfig.visible = false;
      this.getData();
    },
    // 列表点击删除用户
    async onDelete(record) {
      await deleteUser(record.id);
      this.$message.success(`删除用户${record.username}成功`);
      this.table.records = this.table.records.filter(
        (item) => item.id != record.id
      );
      this.getData();
    },
    // 用户行编辑
    onEdit(text, record) {
      this.editConfig.editId = record.id;
      this.editConfig.visible = true;
    }
  }
};
</script>
