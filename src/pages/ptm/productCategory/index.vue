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
          pagination="bottom"
        >
          <span slot="icon" slot-scope="icon">
            <y-img :src="globalConfig.imgBaseUrl + icon"></y-img>
          </span>
          <!--          slot-scope(当前数据，当前行)-->
          <span slot="level" slot-scope="text">
            {{ text.desc }}
          </span>
          <a-button-group slot="operation" slot-scope="text, record, index">
            <a-button @click="()=> onProductCateListRowEdit(text, record, index)">编辑</a-button>
          </a-button-group>
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
                         @onSaveSubmit="onEditProductCateSubmitHandle"></edit-product-cate>
    </a-drawer>
  </div>
</template>

<script>
import editProductCate from './edit.vue';
import { columns } from './pageConfig';
import { getProductCategoryPageList } from '@/api/ptm/productCategory';

export default {
  name: 'ProductCategory',
  components: { editProductCate },
  mixins: [],
  data() {
    return {
      columns,
      tableData: {
        records: []
      },
      editConfig: {
        editData: {},
        visible: false
      }
    };
  },
  created() {
    this.getProductCateListData();
  },
  methods: {
    async getProductCateListData() {
      this.tableData = await getProductCategoryPageList();
    },
    onAddProductCateHandle() {
      this.editConfig.editData={};
      this.editConfig.visible = true;
    },
    onEditProductCateSubmitHandle(){
      this.editConfig.visible = false;
      this.getProductCateListData();
    },
    onProductCateListRowEdit(text, record, index){
      console.log('text:', text);
      console.log('record:', record);
      console.log('index:', index);
      this.editConfig.editData = record;
      this.editConfig.visible = true;
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
