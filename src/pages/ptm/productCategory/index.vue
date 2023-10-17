<template>
  <div class="manage-container">
    <div class="search-container"></div>
    <div class="content-container">
      <div class="operate-btn-container">
        <a-button type="primary" @click="onAddProductCateHandle">
          添加分类
        </a-button>
        <a-button> 批量删除 </a-button>
      </div>
      <div ref="listContainer" class="list-container">
        <a-table
          :columns="columns"
          :data-source="tableData.records"
          :scroll="{ x: '100%', y: 500 }"
          :rowKey="
            (record, index) => {
              return index;
            }
          "
          :pagination="paginationConfig"
        >
          <span slot="icon" slot-scope="icon">
            <y-img :src="globalConfig.imgBaseUrl + icon" style="height: 50px; width: 50px;"></y-img>
          </span>
          <!--          slot-scope(当前数据，当前行)-->
          <span slot="level" slot-scope="text">
            {{ text.desc }}
          </span>
          <template slot="operation" slot-scope="text, record, index">
            <a-button-group >
<!--            编辑分类-->
              <a-button icon="edit" shape="round" @click="()=> onProductCateListRowEdit(text, record, index)"></a-button>
<!--            删除分类-->
              <a-popconfirm
                :title="'确定删除名称为【'+record.name +'】的分类'"
                ok-text="确定"
                cancel-text="取消"
                @confirm="() => onProductCateListRowDelete(record)"
              >
                <a-button icon="delete" type="danger" shape="round" ></a-button>
              </a-popconfirm>
            </a-button-group>
          </template>
        </a-table>
      </div>
    </div>

    <a-drawer
      title="商品属性"
      width="500"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <edit-product-cate v-if="editConfig.visible"
                         :editData="editConfig.editData"
                         @onSaveSubmit="onEditProductCateSubmitHandle"
                         @onCancelSubmit="editConfig.visible = false"></edit-product-cate>
    </a-drawer>
  </div>
</template>

<script>
import editProductCate from './edit.vue';
import { columns } from './pageConfig';
import { getProductCategoryPageList, deleteProductCategory } from '@/api/ptm/productCategory';

export default {
  name: 'ProductCategory',
  components: { editProductCate },
  mixins: [],
  data() {
    return {
      columns,
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
      tableData: {
        records: [], // 表单数据
      },
      tableQueryParams:{ // 表单查询对象
        pageSize: 10,
        pageNum: 1,
        id: null,
        pid: null,
        tenantId: null, //商户id
        name: null, // 分类名称
        level: null, // 层级
        isShow: null, // 是否显示
        createTimeStart: null, // 创建时间
        createTimeEnd: null,
        updateTimeStart: null,
        updateTimeEnd: null,
        createUser: null,
        updateUser: null

      },
      editConfig: {
        editData: {},
        visible: false
      }
    };
  },
  created() {
    this.getProductCateListData(this.tableQueryParams);
  },
  methods: {
    async getProductCateListData(params) {
      this.tableData = await getProductCategoryPageList(params);
      this.paginationConfig.total = this.tableData.total;
    },
    onAddProductCateHandle() {
      this.editConfig.editData={};
      this.editConfig.visible = true;
    },
    onEditProductCateSubmitHandle(){
      this.editConfig.visible = false;
      this.getProductCateListData(this.tableQueryParams);
    },
    onProductCateListRowEdit(text, record){
      this.editConfig.editData = record;
      this.editConfig.visible = true;
    },
    onProductCateListRowDelete(record){
      deleteProductCategory(record.id);
      this.$message.success(`删除分类${record.name}成功`);
      this.getProductCateListData(this.tableQueryParams);
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

.editable-row-operations a {
  margin-right: 8px;
}
</style>
