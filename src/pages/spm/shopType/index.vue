<template>
  <div>
    <y-search
      :loading="table.loading"
      :columns="table.columns"
      @search="search"
    >
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
          @confirm="() => delData()"
        >
          <a-button :disabled="table.rowSelection.selectedRowKeys.length <= 0">
            批量删除
          </a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
      </div>
      <div slot="isShow" slot-scope="{ text, record }" class="y-flex">
        {{ text ? '显示' : '不显示' }}
      </div>
      <div slot="operation" slot-scope="{ text, record }" class="y-flex">
        <a-button-group>
          <a-button
            icon="edit"
            shape="round"
            @click="() => onEdit(text, record)"
          ></a-button>
          <a-popconfirm
            :title="'确定删除为【' + record.name + '】的店铺类型吗'"
            ok-text="确定"
            cancel-text="取消"
            @confirm="() => delData(record)"
          >
            <a-button icon="delete" type="danger" shape="round"></a-button>
          </a-popconfirm>
        </a-button-group>
      </div>
    </y-table>
    <a-drawer
      :title="editConfig.title"
      width="700"
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
import { getShopTypePageList, deleteShopType } from '@/api/spm/shopType';
import edit from './edit.vue';
export default {
  components: {
    edit
  },
  data() {
    return {
      form: {},
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
        title: null
      },
      columns
    };
  },
  created() {
    this.getData();
  },

  methods: {
    // 批量选中
    tableSelectedRowKeys(selectedRowKeys) {
      console.log('tableSelectedRowKeys', selectedRowKeys);
      this.table.rowSelection.selectedRowKeys = selectedRowKeys;
    },
    // 单条删除,批量删除
    async delData(data) {
      if (data == undefined) {
        deleteShopType(this.table.rowSelection.selectedRowKeys.join(','));
        this.$message.success('批量删除成功');
        this.getData();
      } else {
        await deleteShopType(data.id);
        this.$message.success('删除成功');
        this.getData();
      }
    },
    onEditSubmit() {
      // emit 触发 重新加载table
      this.getData(this.tableQueryParams);
    },
    tableChange() {},
    addForm() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
      this.editConfig.title = '添加店铺类型';
    },
    onEdit(text, record) {
      this.editConfig.editId = record.id;
      this.editConfig.title = '修改店铺类型';
      this.editConfig.visible = true;
      this.editConfig.title = '修改店铺类型';
    },
    search(form) {
      this.searchForm = form;
      this.getData();
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
