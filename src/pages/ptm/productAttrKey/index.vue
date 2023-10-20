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
            <a-popconfirm
              v-if="tableData.records.length"
              title="Sure to delete?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="() => onDelete(record.key)"
            >
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>

    <a-drawer
      title="商品属性"
      width="500"
      :visible="editConfig.visible"
      @close="onCloseEditProductAttrKeyHandle"
    >
      <edit v-if="editConfig.visible"></edit>
    </a-drawer>
  </div>
</template>

<script>
import { columns } from './pageConfig';
import { getProductAttrKeyPageList } from '@/api/ptm/productAttrKey.js';
import edit from './edit.vue';
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
        visible: false
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.tableData = await getProductAttrKeyPageList();
    },
    onAddProductAttrKeyHandle() {
      this.editConfig.visible = true;
    },
    onDelete(key) {
      console.log('key:', key);
      this.$message.success('Click on Yes');
    },
    onCloseEditProductAttrKeyHandle() {}
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
