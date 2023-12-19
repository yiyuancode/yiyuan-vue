<template>
  <div style="width: 100%">
    <el-cascader
      v-model="selectedKeys"
      :options="treeData"
      :props="{ multiple, children: 'children', label: 'name', value: 'id' }"
      size="small"
      :show-all-levels="false"
      :placeholder="placeholder"
      clearable
      @change="change"
    ></el-cascader>
  </div>
</template>
<script>
import { getProductCategoryTreeListForShop } from '@/api/ptm/productCategory.js';
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
      type: Array || String,
      default: function () {
        return null;
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
        return '请选择店铺类型';
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
    if (this.tenantId) {
      await this.getData();
      if (this.value) {
        this.selectedKeys = getCascaderSelectedKeys(this.treeData, this.value);
      }
    }
  },
  methods: {
    async getData() {
      this.treeData = await getProductCategoryTreeListForShop({
        tenantId: this.tenantId
      });
      this.setDisable(5, this.treeData);
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
    },
    /**
     * level: 当前层级
     * data: 当前层级的数据
     */
    setDisable(level, data) {
      let _this = this;
      data.forEach((v) => {
        //此处判断可根据你后台返回的数据类型适当变换，原理就是将不符合条件的项给禁掉
        if (!v.children && v.level.value < level) {
          v.disabled = true;
        }
        if (v.children && v.level.value < level) {
          v.disabled = false;
        }
        if (!v.children && v.level.value == level) {
          v.disabled = false;
        }
        if (v.children) {
          _this.setDisable(level, v.children);
        }
      });
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
