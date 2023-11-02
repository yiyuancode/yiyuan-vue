<template>
  <div style="width: 100%;">
    <el-cascader
      v-model="selectedKeys"
      :options="treeData"
      :props="{ checkStrictly: true,children: 'children', label: 'name', value: 'id' }"
      size="small"
      :show-all-levels="false"
      clearable
      @change="change"
    ></el-cascader>
  </div>
</template>
<script>
  import {getProductCategoryTreeList} from "@/api/ptm/productCategory.js";

  export default {
    props: {
      tenantId: {
        type: String,
        default: function () {
          return null;
        }
      },
      value: {
        type: String,
        default: function () {
          return null;
        }
      },
      allowClear: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      multiple: {
        type: Boolean,
        default: function () {
          return true;
        }
      },
      placeholder: {
        type: String,
        default: function () {
          return "请选择商品类型";
        }
      },
      treeDefaultExpandAll: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      replaceFields: {
        type: Object,
        default: function () {
          return {children: 'children', title: 'name', key: 'id', value: 'id'};
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
      await this.getData();
      // this.selectedKeys = this.value
    },
    methods: {
      async getData() {
        let treeList = await getProductCategoryTreeList();
        this.treeData = treeList;
        console.log("this.treeData", this.treeData)

      },
      change(value) {
        let id = value[value.length - 1];
        this.$emit('input', id + "|" + JSON.stringify(value));
        this.$emit('change', id + "|" + JSON.stringify(value));

      },

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
