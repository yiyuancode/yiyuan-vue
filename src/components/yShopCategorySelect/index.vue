<template>
  <div style="width: 100%;">
    <el-cascader
      v-model="selectedKeys"
      :options="treeData"
      :props="{ multiple,children: 'children', label: 'name', value: 'id' }"
      size="small"
      :show-all-levels="false"
      clearable
      @change="change"
    ></el-cascader>
  </div>
</template>
<script>
  import {getProductCategoryTreeListForShop} from "@/api/ptm/productCategory.js";

  export default {
    props: {
      tenantId: {
        type: String,
        default: function () {
          return null;
        }
      },
      value: {
        type: Array || String,
        default: function () {
          return [];
        }
      },
      multiple: {
        type: Boolean,
        default: function () {
          return true;
        }
      },

    },
    data() {
      return {
        treeData: [],
        selectedKeys: []
      };
    },
    computed: {},
    async created() {
      if (this.tenantId) {
        await this.getData();
      }
    },
    methods: {
      async getData() {
        let treeList = await getProductCategoryTreeListForShop({tenantId: this.tenantId});
        this.treeData = treeList;
      },
      change(value) {
        console.log("change", value)
        this.$emit('input', value);
        this.$emit('change', value);
      }
    }
  };
</script>
<style lang="less" scoped>
  .ant-advanced-search-form {
    padding: 10px;

    /deep/ .ant-form-item {
      display: flex;

      .ant-form-item-label {
        width: 100px;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 显示省略符号 */
      }

      .ant-form-item-control-wrapper {
        flex: 1;

        .ant-calendar-picker {
          width: 100% !important;
        }
      }
    }
  }

  .y-tools {
    height: 100px;
    width: 100%;
    background: red;
  }

  .y-table {
    margin: 20px;
  }
</style>
