<template>
  <div>
    <y-search
      :scopedSlots="['id', 'tenantId', 'name', 'isShow', 'categoryIds']"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item slot="id" slot-scope="{ form }" label="ID">
        <a-input v-model="form.id" placeholder="ID" allowClear />
      </a-form-model-item>
      <a-form-model-item slot="tenantId" slot-scope="{ form }" label="商户">
        <y-shop-select v-model="form.tenantId"></y-shop-select>
      </a-form-model-item>
      <a-form-model-item slot="name" slot-scope="{ form }" label="品牌名称">
        <a-input v-model="form.name" placeholder="搜索品牌名称" allowClear />
      </a-form-model-item>
      <a-form-model-item
        slot="categoryIds"
        slot-scope="{ form }"
        label="商品分类"
      >
        <y-plat-category-select
          v-model="form.categoryIds"
        ></y-plat-category-select>
      </a-form-model-item>
      <a-form-model-item slot="isShow" slot-scope="{ form }" label="显示状态">
        <a-select v-model="form.isShow" placeholder="选择显示状态" allowClear>
          <a-select-option value="0"> 不显示</a-select-option>
          <a-select-option value="1"> 显示</a-select-option>
        </a-select>
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
      <div slot="icon" slot-scope="{ text, record }" class="y-flex">
        <y-img :src="globalConfig.imgBaseUrl + text" :width="35"></y-img>
      </div>
      <!--          slot-scope(当前数据，当前行)-->
      <div slot="level" slot-scope="{ text, record }" class="y-flex">
        {{ text.desc }}
      </div>
      <div slot="isShow" slot-scope="{ text, record }" class="y-flex">
        {{ text ? '显示' : '不显示' }}
      </div>
      <div slot="operation" slot-scope="{ text, record }" class="y-flex">
        <a-button-group>
          <!--            编辑分类-->
          <a-button
            icon="edit"
            shape="round"
            @click="() => onEdit(text, record)"
          ></a-button>
          <!--            删除分类-->
          <a-popconfirm
            :title="'确定删除名称为【' + record.name + '】的分类'"
            ok-text="确定"
            cancel-text="取消"
            @confirm="() => onDelete(record)"
          >
            <a-button icon="delete" type="danger" shape="round"></a-button>
          </a-popconfirm>
        </a-button-group>
      </div>
    </y-table>

    <a-drawer
      title="品牌"
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
import {
  getProductBrandPageList,
  deleteProductBrand
} from '@/api/ptm/productBrand';
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
          fixed: true, // 锁定左侧复选框
          selectedRowKeys: [],
          onChange: this.tableSelectedRowKeys
        }
      },
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
    // TODO 此处是组件将查询的固定属性赋值给当前业务组件使用 将文档链接 。。。
    search(form) {
      this.searchForm = form;
      this.searchForm.pageNum = 1;
      this.getData();
    },
    tableSelectedRowKeys(selectedRowKeys) {
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
      let { records, total, current } = await getProductBrandPageList({
        pageNum: pageNum,
        pageSize: pageSize,
        ...this.searchForm
      });
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    },

    // 新增商品标签
    onAdd() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    // 批量删除商品标签
    async onBatchDelete() {
      await deleteProductBrand(
        this.table.rowSelection.selectedRowKeys.join(',')
      );
      this.$message.success(`批量删除分类成功`);
      this.table.records = this.table.records.filter(
        (item) => !this.table.rowSelection.selectedRowKeys.includes(item.id)
      );
      this.table.rowSelection.selectedRowKeys = [];
      this.getData();
    },
    // 商品标签编辑后提交事件
    onEditSubmit() {
      this.editConfig.visible = false;
      this.getData();
    },
    // 列表点击删除商品标签
    async onDelete(record) {
      await deleteProductBrand(record.id);
      this.$message.success(`删除品牌${record.name}成功`);
      this.table.records = this.table.records.filter(
        (item) => item.id != record.id
      );
      this.getData();
    },
    // 商品标签行编辑
    onEdit(text, record) {
      this.editConfig.editId = record.id;
      this.editConfig.visible = true;
    }
  }
};
</script>
