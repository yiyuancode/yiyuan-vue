<template>
  <div>
    <y-search
      :scopedSlots="['name', 'pid', 'level', 'isShow']"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item slot="name" slot-scope="{ form }" label="分类名称">
        <a-input v-model="form.name" placeholder="搜索分类名称" allowClear />
      </a-form-model-item>
      <a-form-model-item slot="pid" slot-scope="{ form }" label="父级分类">
        <a-cascader
          v-model="form.pid"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          :options="searchDataOfProductCate"
          placeholder="请选择商品分类"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item slot="level" slot-scope="{ form }" label="层级">
        <a-select v-model="form.level" placeholder="选择层级" allowClear>
          <a-select-option :value="1"> 一级</a-select-option>
          <a-select-option :value="2"> 二级</a-select-option>
          <a-select-option :value="3"> 三级</a-select-option>
        </a-select>
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
        <y-img :src="text" :width="35"></y-img>
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
      title="商品分类"
      width="800"
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
  deleteProductCategory,
  getProductCategoryPageList,
  getProductCategoryTreeList
} from '@/api/ptm/productCategory';
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
    this.getProductCategoryTree();
  },
  methods: {
    search(form) {
      this.searchForm = form;
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
      let { records, total, current } = await getProductCategoryPageList({
        pageNum: pageNum,
        pageSize: pageSize,
        ...this.searchForm
      });
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    },

    // 新增商品分类
    onAdd() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    // 批量删除商品分类
    async onBatchDelete() {
      await deleteProductCategory(
        this.table.rowSelection.selectedRowKeys.join(',')
      );
      this.$message.success(`批量删除分类成功`);
      this.table.records = this.table.records.filter(
        (item) => !this.table.rowSelection.selectedRowKeys.includes(item.id)
      );
      this.table.rowSelection.selectedRowKeys = [];
      this.getData();
    },
    // 商品分类编辑后提交事件
    onEditSubmit() {
      this.editConfig.visible = false;
      this.getData(this.tableQueryParams);
    },
    // 列表点击删除商品分类
    async onDelete(record) {
      await deleteProductCategory(record.id);
      this.$message.success(`删除分类${record.name}成功`);
      this.table.records = this.table.records.filter(
        (item) => item.id != record.id
      );
      this.getData();
    },
    // 商品分类行编辑
    onEdit(text, record) {
      this.editConfig.editId = record.id;
      this.editConfig.visible = true;
    },
    //获取父级树结构
    async getProductCategoryTree() {
      this.searchDataOfProductCate = await getProductCategoryTreeList();
    }
  }
};
</script>
