<template>
  <div style="width: 100%">
    <a-cascader
      v-model="selectedKeys"
      :options="options"
      :load-data="loadData"
      :placeholder="placeholder"
      :field-names="fieldNames"
      :allowClear="allowClear"
      change-on-select
      @change="onChange"
    />
  </div>
</template>
<script>
import { getCityTreeById, getCityTreeByPid } from '@/api/sys/area.js';
import _ from 'lodash';

export default {
  props: {
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
    placeholder: {
      type: String,
      default: function () {
        return '请选择城市区域';
      }
    },
    fieldNames: {
      type: Object,
      default: function () {
        return { label: 'name', value: 'id', children: 'children' };
      }
    }
  },
  data() {
    return {
      selectedKeys: [],
      options: []
    };
  },
  computed: {},
  async created() {
    //回显还是不回显示
    if (this.value) {
      this.selectedKeys = this.value.split(',');
      this.options = await this.init();
    } else {
      this.options = await this.getData(0);
      console.log('this.options', this.options);
    }
  },
  methods: {
    async init() {
      let keys = this.selectedKeys;
      return await getCityTreeById(keys[keys.length - 1]);
    },
    async getData(pid) {
      let treeList = await getCityTreeByPid(pid);
      return treeList;

      // this.options = treeList
    },
    onChange() {
      this.$emit('input', this.selectedKeys.join(','));
    },
    async loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      let targetOptionOld = _.cloneDeep(targetOption);
      targetOption.children = await this.getData(targetOption.id);
      targetOption.loading = false;
      //直接转成字符串进行替换,避免用递归循环替换新的对象
      let all = JSON.stringify(this.options);
      let targetOptionOldStr = JSON.stringify(targetOptionOld);
      let targetOptionNewStr = JSON.stringify(targetOption);
      all.replace(targetOptionOldStr, targetOptionNewStr);
      this.options = JSON.parse(all);
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
