<template>
  <div>
    <y-search
      :columns="[]"
      :scopedSlots="3"
      @search="onProductCateSearchHandle"
    >
      <a-form-model-item slot="scopedSlots-0" label="分类名称">
        <a-input
          v-model="tableQueryParams.name"
          placeholder="搜索分类名称"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item slot="scopedSlots-1" label="父级分类">
        <a-cascader
          v-model="tableQueryParams.pid"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          :options="searchDataOfProductCate"
          placeholder="请选择商品分类"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item slot="scopedSlots-2" label="层级">
        <a-select
          v-model="tableQueryParams.level"
          placeholder="选择层级"
          allowClear
        >
          <a-select-option :value="1"> 一级</a-select-option>
          <a-select-option :value="2"> 二级</a-select-option>
          <a-select-option :value="3"> 三级</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item slot="scopedSlots-3" label="显示状态">
        <a-select
          v-model="tableQueryParams.isShow"
          placeholder="选择显示状态"
          allowClear
        >
          <a-select-option value="0"> 不显示</a-select-option>
          <a-select-option value="1"> 显示</a-select-option>
        </a-select>
      </a-form-model-item>
    </y-search>
    <y-table
      rowKey="id"
      :columns="columns"
      :records="tableData.records"
      :pagination="paginationConfig"
      :rowSelection="{
        fixed: true,
        onChange: onTableSelectedChange,
        selectedRowKeys: tableData.selectedKeys
      }"
    >
      <div slot="operations" class="operate-btn-container">
        <a-button type="primary" @click="onAddProductCateHandle">
          添加分类
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="'确定批量删除选中的分类'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => onProductCateListDelete()"
        >
          <a-button :disabled="tableData.selectedRows.length <= 0">
            批量删除
          </a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
      </div>
      <span slot="createTime" slot-scope="{ text, record }"> </span>
      <span slot="icon" slot-scope="{ text, record }">
        <y-img
          :src="globalConfig.imgBaseUrl + text"
          style="height: 30px; width: 30px"
        ></y-img>
      </span>
      <!--          slot-scope(当前数据，当前行)-->
      <span slot="level" slot-scope="{ text, record }">
        {{ text.desc }}
      </span>
      <span slot="isShow" slot-scope="{ text, record }">
        {{ text ? '显示' : '不显示' }}
      </span>
      <template slot="operation" slot-scope="{ text, record }">
        <a-button-group>
          <!--            编辑分类-->
          <a-button
            icon="edit"
            shape="round"
            @click="() => onProductCateListRowEdit(text, record)"
          ></a-button>
          <!--            删除分类-->
          <a-popconfirm
            :title="'确定删除名称为【' + record.name + '】的分类'"
            ok-text="确定"
            cancel-text="取消"
            @confirm="() => onProductCateListRowDelete(record)"
          >
            <a-button icon="delete" type="danger" shape="round"></a-button>
          </a-popconfirm>
        </a-button-group>
      </template>
    </y-table>

    <a-drawer
      title="商品属性"
      width="500"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <edit-product-cate
        v-if="editConfig.visible"
        :editId="editConfig.editId"
        @onSaveSubmit="onEditProductCateSubmitHandle"
        @onCancelSubmit="editConfig.visible = false"
      ></edit-product-cate>
    </a-drawer>
  </div>
</template>
<script>
import editProductCate from './edit.vue';
import { columns } from './pageConfig';

import {
  deleteProductCategory,
  getProductCategoryPageList,
  getProductCategoryTreeList
} from '@/api/ptm/productCategory';

export default {
  name: 'ProductCategory',
  components: { editProductCate },
  mixins: [],
  data() {
    return {
      columns,
      paginationConfig: {
        pageNum: 1, // 当前页码
        pageSize: 10, // 每页显示条数
        total: 0, // 数据总数
        showSizeChanger: true, // 是否显示每页显示条数切换器
        pageSizeOptions: ['10', '20', '30', '40'], // 每页显示条数选项
        showTotal: (total) => `共 ${total} 条数据`, // 自定义显示总条数文本
        onChange: this.handlePageChange, // 页码改变的回调
        onShowSizeChange: this.handlePageSizeChange // 每页显示条数改变的回调
      },
      tableHeight: 0,
      tableData: {
        records: [], // 表单数据
        selectedRows: [], // 表格首列选择项
        selectedKeys: [] // 表格选中的数据，暂时仅仅用于清空操作后的列表选中状态
      },
      tableQueryParams: {
        // 表单查询对象
        pageSize: 10,
        pageNum: 1,
        id: null,
        pid: null,
        tenantId: null, //商户id
        name: null, // 分类名称
        level: undefined, // 层级
        isShow: undefined, // 是否显示
        createTimeStart: null, // 创建时间
        createTimeEnd: null,
        updateTimeStart: null,
        updateTimeEnd: null,
        createUser: null,
        updateUser: null
      },
      searchDataOfProductCate: [], // 商品类型父级选择框下拉数据
      editConfig: {
        editId: null,
        visible: false
      }
    };
  },
  mounted() {
    // 计算table高度
    this.calculateTableHeight();
  },
  created() {
    this.getProductCateListData(this.tableQueryParams);
    this.getProductCategoryTreeListForSearchForm();
  },
  methods: {
    calculateTableHeight() {
      // 根据实际情况计算表格高度，例如根据窗口高度、父容器高度等
      this.tableHeight = window.innerHeight - 370; // 示例：减去200像素的高度作为表格高度
    },
    // 商品分类搜索
    onProductCateSearchHandle() {
      this.tableQueryParams.pageNum = 1;
      this.getProductCateListData(this.tableQueryParams);
    },
    /**
     * 商品分类分类列表
     * @param params 分页参数
     * @returns {Promise<void>}
     */
    async getProductCateListData(params) {
      let productCateListData = await getProductCategoryPageList(params);
      this.tableData.records = productCateListData.records;
      this.paginationConfig.total = productCateListData.total;
      this.paginationConfig.pageNum = productCateListData.current;
    },
    // 新增商品分类
    onAddProductCateHandle() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    // 商品分类编辑后提交事件
    onEditProductCateSubmitHandle() {
      this.editConfig.visible = false;
      this.getProductCateListData(this.tableQueryParams);
    },
    // 商品分类行编辑
    onProductCateListRowEdit(text, record) {
      this.editConfig.editId = record.id;
      this.editConfig.visible = true;
    },
    // 列表点击删除商品分类
    async onProductCateListRowDelete(record) {
      await deleteProductCategory(record.id);
      this.$message.success(`删除分类${record.name}成功`);
      await this.getProductCateListData(this.tableQueryParams);
    },
    // 批量删除商品分类
    async onProductCateListDelete() {
      let forDelIds = this.tableData.selectedRows
        .map((item) => item.id)
        .join(',');
      await deleteProductCategory(forDelIds);
      this.$message.success(`批量删除分类成功`);
      this.tableData.selectedKeys = [];
      // this.tableData.selectedRows = [];
      await this.getProductCateListData(this.tableQueryParams);
    },
    // 处理当前第几页
    handlePageChange(page) {
      this.tableQueryParams.pageNum = page;
      this.paginationConfig.current = page;
      this.getProductCateListData(this.tableQueryParams);
    },
    // 处理每页显示条数改变的逻辑
    handlePageSizeChange(pageSize) {
      this.tableQueryParams.pageSize = pageSize;
      this.getProductCateListData(this.tableQueryParams);
    },
    async getProductCategoryTreeListForSearchForm() {
      this.searchDataOfProductCate = await getProductCategoryTreeList();
    },
    // 列表多选事件
    onTableSelectedChange(selectedRowKeys, selectedRow) {
      this.tableData.selectedRows = selectedRow;
      this.tableData.selectedKeys = selectedRowKeys;
    }
  }
};
</script>
