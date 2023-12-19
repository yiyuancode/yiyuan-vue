<template>
  <div style="width: 100%">
    <!--checkStrictly: true,-->
    <el-cascader
      v-model="selectedKeys"
      :options="treeData"
      :props="{ multiple, children: 'children', label: 'name', value: 'id' }"
      size="small"
      :show-all-levels="false"
      clearable
      :placeholder="placeholder"
      @change="change"
    ></el-cascader>
  </div>
</template>
<script>
import { getProductCategoryTreeList } from '@/api/ptm/productCategory.js';
import { getCascaderSelectedKeys } from '@/utils/cascaderUtils.js';

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
        return '请选择店铺内部商品分类';
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
        return { children: 'children', title: 'name', key: 'id', value: 'id' };
      }
    }
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
    if (this.value) {
      this.selectedKeys = getCascaderSelectedKeys(this.treeData, this.value);
      console.log('res.arr', this.selectedKeys);
    }
  },
  methods: {
    async getData() {
      this.treeData = await getProductCategoryTreeList();
      console.log('yProductCategorySelect.arr', this.treeData);
    },
    change(value) {
      let ids = value
        .map(function (item) {
          return item[item.length - 1];
        })
        .join(',');
      this.$emit('input', ids);
      this.$emit('change', ids);
      console.log('yProductCategorySelect.ids', ids);
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
