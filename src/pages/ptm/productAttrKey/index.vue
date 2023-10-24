<template>
  <div>
    <y-search
      :columns="[]"
      :scopedSlots="5"
      @search="onProductAttrSearchHandle"
    >
      <a-form-model-item slot="scopedSlots-0" label="状态">
        <a-select
          v-model="tableQueryParams.isShow"
          allowClear
          placeholder="选择显示状态"
        >
          <a-select-option :value="0"> 不显示</a-select-option>
          <a-select-option :value="1"> 显示</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item slot="scopedSlots-1" label="ID">
        <a-input
          v-model="tableQueryParams.id"
          allowClear
          placeholder="商户"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item slot="scopedSlots-2" label="父级分类">
        <a-cascader
          v-model="tableQueryParams.ptmProductCategoryId"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          :options="searchDataOfProductCate"
          placeholder="请选择商品分类"
        />
      </a-form-model-item>
      <a-form-model-item slot="scopedSlots-3" label="属性名称">
        <a-input
          v-model="tableQueryParams.attrKey"
          placeholder="搜索 属性名称"
          allowClear
        />
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
      <span slot="createTime" slot-scope="{ text, record }"> </span>
      <a slot="isShow" slot-scope="{ text, record }">{{
        text ? '显示' : '隐藏'
      }}</a>
      <template slot="operation" slot-scope="{ text, record }">
        <!--            根据商品shuxingzhi-->
        <a-button
          icon="tool"
          shape="round"
          @click="() => onProductAttrKeyListRowAttrValue(record)"
        ></a-button>
        <!--            编辑商品属性Key-->
        <a-button
          icon="edit"
          shape="round"
          @click="() => onProductAttrKeyListRowEdit(record)"
        ></a-button>
        <!--            删除属性Key-->
        <a-popconfirm
          :title="'确定删除名称为【' + record.attrKey + '】的属性Key'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => onProductAttrKeyRowDelete(record)"
        >
          <a-button icon="delete" type="danger" shape="round"></a-button>
        </a-popconfirm>
      </template>
    </y-table>

    <a-drawer
      title="商品属性"
      width="500"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <edit
        v-if="editConfig.visible"
        :editId="editConfig.editId"
        @onSubmitHandleSuccess="onProductAttrKeySubmitSuccess"
      ></edit>
    </a-drawer>
  </div>
</template>

<script>
import { columns } from './pageConfig';
import {
  deleteProductAttrKey,
  getProductAttrKeyPageList
} from '@/api/ptm/productAttrKey.js';
import edit from './edit.vue';
import { getProductCategoryTreeList } from '@/api/ptm/productCategory';

export default {
  name: 'ProductAttrKey',
  components: {
    edit
  },
  mixins: [],
  data() {
    return {
      columns,
      tableData: {
        records: [],
        selectedRows: [], // 表格首列选择项
        selectedKeys: [] // 表格选中的数据，暂时仅仅用于清空操作后的列表选中状态
      },
      editConfig: {
        editId: null,
        visible: false
      },
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
      tableQueryParams: {
        // 表单查询对象
        pageSize: 10,
        pageNum: 1,
        id: null,
        pid: null,
        tenantId: null, //商户id
        attrKey: null, // 分类名称
        isShow: undefined, // 是否显示
        ptmProductCategoryId: null,
        createTimeStart: null, // 创建时间
        createTimeEnd: null,
        updateTimeStart: null,
        updateTimeEnd: null,
        createUser: null,
        updateUser: null
      },
      searchDataOfProductCate: [] // 商品类型父级选择框下拉数据
    };
  },
  created() {
    this.getProductAttrKeyList(this.tableQueryParams);
    this.getProductCategoryTreeListForSearchForm();
  },
  methods: {
    onProductAttrSearchHandle() {
      this.tableQueryParams.pageNum = 1;
      console.log('this.tableQueryParams:', this.tableQueryParams);
      this.getProductAttrKeyList(this.tableQueryParams);
    },
    /**
     * 获取商品属性key分页列表数据
     * @param params
     * @returns {Promise<void>}
     */
    async getProductAttrKeyList(params) {
      let productAttrKeyListResult = await getProductAttrKeyPageList(params);
      this.tableData.records = productAttrKeyListResult.records;
      this.paginationConfig.total = productAttrKeyListResult.total;
      this.paginationConfig.pageNum = productAttrKeyListResult.current;
    },
    /**
     * 打开新增商品属性Key新增
     */
    onAddProductAttrKeyHandle() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    /**
     * 列表上行数据点击删除
     * @param rowData
     * @returns {Promise<void>}
     */
    async onProductAttrKeyRowDelete(rowData) {
      await deleteProductAttrKey(rowData.id);
      await this.getProductAttrKeyList(this.tableQueryParams);
      this.$message.success('删除属性名成功');
    },
    /**
     * 列表上行数据，点击编辑，传递待编辑id，打开编辑页面
     * @param rowData
     */
    onProductAttrKeyListRowEdit(rowData) {
      this.editConfig.editId = rowData.id;
      this.editConfig.visible = true;
    },
    /**
     * 维护商品属性Key操作后的表单提交事件
     */
    onProductAttrKeySubmitSuccess() {
      this.editConfig.visible = false;
      this.getProductAttrKeyList(this.tableQueryParams);
    },
    // 处理当前第几页
    handlePageChange(page) {
      this.tableQueryParams.pageNum = page;
      this.paginationConfig.current = page;
      this.getProductAttrKeyList(this.tableQueryParams);
    },
    // 处理每页显示条数改变的逻辑
    handlePageSizeChange(pageSize) {
      this.tableQueryParams.pageSize = pageSize;
      this.getProductAttrKeyList(this.tableQueryParams);
    },
    // 列表多选事件
    onTableSelectedChange(selectedRowKeys, selectedRow) {
      this.tableData.selectedRows = selectedRow;
      this.tableData.selectedKeys = selectedRowKeys;
    },
    async onProductAttrListDelete() {
      let forDelIds = this.tableData.selectedRows
        .map((item) => item.id)
        .join(',');
      await deleteProductAttrKey(forDelIds);
      this.$message.success(`批量删除属性成功`);
      this.tableData.selectedKeys = [];
      // this.tableData.selectedRows = [];
      await this.getProductAttrKeyList(this.tableQueryParams);
    },
    async getProductCategoryTreeListForSearchForm() {
      this.searchDataOfProductCate = await getProductCategoryTreeList();
    },
    onProductAttrKeyListRowAttrValue(rowData) {
      console.log('编辑商品属性', rowData);
    }
  }
};
</script>
