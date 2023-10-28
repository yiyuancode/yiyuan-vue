<template>
  <div style="width: 100%;">
    <a-tree-select
      v-model="selectedKeys"
      style="width: 100%;"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :allowClear="allowClear"
      :multiple="multiple"
      :tree-data="treeData"
      :placeholder="placeholder"
      :replaceFields="replaceFields"
      tree-checkable
      treeCheckStrictly
      :tree-default-expand-all="treeDefaultExpandAll"
      @change="change"
    >
    </a-tree-select>
  </div>
</template>
<script>
  import {getProductCategoryTreeList} from "@/api/ptm/productCategory.js";

  export default {
    props: {
      value: {
        type: Array || String,
        default: function () {
          return [];
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
          return "请选择";
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
      this.selectedKeys = this.value
    },
    methods: {
      async getData() {
        let treeList = await getProductCategoryTreeList();
        this.treeData = treeList;
      },
      change(value, label, extra) {
        this.$emit('input', value);
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
  }

  .y-table {
    margin: 20px;
  }
</style>
