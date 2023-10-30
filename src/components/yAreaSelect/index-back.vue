<template>
  <div style="width: 100%;">
    <a-cascader
      :options="options"
      :load-data="loadData"
      placeholder="请选择区域"
      :field-names="fieldNames"
      change-on-select
      @change="onChange"
    />
  </div>
</template>
<script>
  import {getCityTreeByPid} from '@/api/sys/area.js';
  import _ from 'lodash';

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
      fieldNames: {
        type: Object,
        default: function () {
          return {label: 'name', value: 'id', children: 'children'};
        }
      },

    },
    data() {
      return {
        treeData: [],
        options: [],
      };
    },
    computed: {},
    async created() {
      this.options = await this.getData(0);
    },
    methods: {
      async getData(pid) {
        let treeList = await getCityTreeByPid(pid);
        return treeList;
        // this.options = treeList
      },
      change(value, label, extra) {
        this.$emit('input', value);
      },
      onChange(value) {
        console.log(value);
      },
      async loadData(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        let targetOptionOld = _.cloneDeep(targetOption);
        console.log("targetOptionOld", targetOptionOld)
        targetOption.children = await this.getData(targetOption.id);
        targetOption.loading = false;
        console.log("targetOptionNew", targetOption)
        // this.options = [...this.options];
        //直接转成字符串进行替换,避免用递归循环替换新的对象
        let all = JSON.stringify(this.options);
        let targetOptionOldStr = JSON.stringify(targetOptionOld);
        let targetOptionNewStr = JSON.stringify(targetOption);
        all.replace(targetOptionOldStr, targetOptionNewStr);
        console.log("all", {all, targetOptionOldStr, targetOptionNewStr})
        this.options = JSON.parse(all);


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
