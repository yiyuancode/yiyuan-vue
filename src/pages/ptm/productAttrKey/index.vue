<template>
  <div class="manage-container">
    <div class="search-container">
      <a-form-model>
        <a-form-model-item label="分类名称">
          <a-select allowClear placeholder="选择显示状态" style="width: 120px">
            <a-select-option value="0"> 不显示 </a-select-option>
            <a-select-option value="1"> 显示 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="content-container">
      <div class="operate-btn-container">
        <a-button type="primary" @click="onAddProductAttrKeyHandle">
          添加属性
        </a-button>
        <a-button> 批量删除 </a-button>
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
import { getProductAttrKeyPageList } from '@/api/ptm/productAttrKey.js';
import edit from './edit.vue';
import {deleteProductAttrKey} from "../../../api/ptm/productAttrKey";
export default {
  name: 'ProductAttrKey',
  components: {
    edit
  },
  mixins: [],
  data() {
    return {
      columns,
      tableData: {},
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
        ptmProductCategoryId: undefined,
        createTimeStart: null, // 创建时间
        createTimeEnd: null,
        updateTimeStart: null,
        updateTimeEnd: null,
        createUser: null,
        updateUser: null
      },
    };
  },
  created() {
    this.getProductAttrKeyList(this.tableQueryParams);
  },
  methods: {
    async getProductAttrKeyList(params) {
      this.tableData = await getProductAttrKeyPageList(params);
      this.paginationConfig.total = this.tableData.total;
      this.paginationConfig.current = this.tableData.current;
    },
    onAddProductAttrKeyHandle() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    async onProductAttrKeyRowDelete(rowData) {
      await deleteProductAttrKey(rowData.id);
      await this.getProductAttrKeyList(this.tableQueryParams);
      this.$message.success('删除属性名成功');
    },
    onProductAttrKeyListRowEdit(rowData){
      this.editConfig.editId = rowData.id;
      this.editConfig.visible = true;
    },
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
