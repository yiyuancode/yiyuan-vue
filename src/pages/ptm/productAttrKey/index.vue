<template>
  <div class="manage-container">
    <div class="search-container">
      <a-form-model :model="tableQueryParams" layout="inline">
        <a-form-model-item label="状态">
          <a-select v-model="tableQueryParams.isShow" allowClear placeholder="选择显示状态" style="width: 120px">
            <a-select-option :value="0"> 不显示 </a-select-option>
            <a-select-option :value="1"> 显示 </a-select-option>
          </a-select>
        </a-form-model-item>
<!--        <a-form-model-item label="商户"> TODO 商户选项待添加-->
<!--          <a-select v-model="tableQueryParams.isShow" allowClear placeholder="选择显示状态" style="width: 120px">-->
<!--            <a-select-option :value="0"> 不显示 </a-select-option>-->
<!--            <a-select-option :value="1"> 显示 </a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-model-item>-->
        <a-form-model-item label="ID">
          <a-input v-model="tableQueryParams.id" allowClear placeholder="商户"></a-input>
        </a-form-model-item>
        <a-form-model-item label="父级分类">
          <a-cascader
            v-model="tableQueryParams.ptmProductCategoryId"
            :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
            :options="searchDataOfProductCate"
            placeholder="请选择商品分类"
          />
        </a-form-model-item>
        <a-form-model-item label="属性名称">
          <a-input
            v-model="tableQueryParams.attrKey"
            placeholder="搜索 属性名称"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onProductAttrSearchHandle">搜索</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="content-container">
      <div class="operate-btn-container">
        <a-button type="primary" @click="onAddProductAttrKeyHandle">
          添加属性
        </a-button>
        <a-popconfirm
          :title="'确定批量删除选中的属性'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => onProductAttrListDelete()"
        >
          <a-button :disabled="tableData.selectedRows.length <= 0"> 批量删除 </a-button>
        </a-popconfirm>
      </div>
      <div ref="listContainer" class="list-container">
        <a-table
          :columns="columns"
          :data-source="tableData.records"
          :scroll="{ x: '100%' }"
          :rowKey="
            (record, index) => {
              return index;
            }
          "
          :pagination="paginationConfig"
          :rowSelection="{
            fixed: true,
            onChange: onTableSelectedChange,
            selectedRowKeys: tableData.selectedKeys
          }"
        >
          <!--          <span slot="id" slot-scope="id">-->
          <!--            <a-tooltip>-->
          <!--              <template slot="title">-->
          <!--                {{ id }}-->
          <!--              </template>-->
          <!--              <a>copy 主键</a>-->
          <!--            </a-tooltip>-->
          <!--          </span>-->
          <!--          <span slot="tenantId" slot-scope="tenantId">-->
          <!--            <a-tooltip>-->
          <!--              <template slot="title">-->
          <!--                {{ tenantId }}-->
          <!--              </template>-->
          <!--              <a>copy 商户ID</a>-->
          <!--            </a-tooltip>-->
          <!--          </span>-->
          <a slot="isShow" slot-scope="isShow">{{
            isShow ? '显示' : '隐藏'
          }}</a>
          <template slot="operation" slot-scope="text, record">
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
              :title="'确定删除名称为【'+ record.attrKey +'】的属性Key'"
              ok-text="确定"
              cancel-text="取消"
              @confirm="() => onProductAttrKeyRowDelete(record)"
            >
              <a-button icon="delete" type="danger" shape="round"></a-button>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>

<!--    商品属性编辑-->
    <a-drawer
      title="商品属性"
      width="500"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <edit v-if="editConfig.visible" :editId="editConfig.editId" @onSubmitHandleSuccess="onProductAttrKeySubmitSuccess"></edit>
    </a-drawer>
  </div>
</template>

<script>
import { columns } from './pageConfig';
import { getProductAttrKeyPageList, deleteProductAttrKey} from '@/api/ptm/productAttrKey.js';
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
        records:[],
        selectedRows: [], // 表格首列选择项
        selectedKeys: [] // 表格选中的数据，暂时仅仅用于清空操作后的列表选中状态
      },
      editConfig: {
        editId: null,
        visible: false
      },
      paginationConfig: {
        current: 1, // 当前页码
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
      searchDataOfProductCate: [], // 商品类型父级选择框下拉数据
    };
  },
  created() {
    this.getProductAttrKeyList(this.tableQueryParams);
    this.getProductCategoryTreeListForSearchForm();
  },
  methods: {
    onProductAttrSearchHandle() {
      this.tableQueryParams.pageNum = 1;
      console.log('this.tableQueryParams:', this.tableQueryParams)
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
      this.paginationConfig.current = productAttrKeyListResult.current;
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
    onProductAttrKeyListRowEdit(rowData){
      this.editConfig.editId = rowData.id;
      this.editConfig.visible = true;
    },
    /**
     * 维护商品属性Key操作后的表单提交事件
     */
    onProductAttrKeySubmitSuccess(){
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
    onProductAttrKeyListRowAttrValue(rowData){
      console.log("编辑商品属性", rowData);
    }
  }
};
</script>

<style lang="less" scoped>
.manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-container,
.content-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.content-container {
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.list-container {
  margin-top: 10px;
  flex: 1 1 auto;
  overflow: hidden;

  /deep/ .ant-table {
    tr {
      td,
      th {
        min-width: 60px;
      }
    }
  }

  .manage-table {
    /deep/ .ant-table-body-inner,
    /deep/ .ant-table-body {
      overflow-y: auto !important;
      scrollbar-color: @primary-color @primary-2;
      scrollbar-width: thin;
      -ms-overflow-style: none;
      position: relative;

      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: @primary-color;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
        border-radius: 3px;
        background: @primary-3;
      }
    }
  }
}

// 操作按钮容器
.operate-btn-container {
  display: flex;

  .ant-btn {
    margin-right: 10px;
  }
}
</style>
