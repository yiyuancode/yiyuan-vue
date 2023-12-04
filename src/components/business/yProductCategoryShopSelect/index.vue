<template>
  <div style="width: 100%;">
    <el-cascader
      v-model="selectedKeys"
      :options="treeData"
      :props="{ multiple,checkStrictly: true,children: 'children', label: 'name', value: 'id' }"
      size="small"
      :placeholder="placeholder"
      :show-all-levels="false"
      clearable
      @change="change"
    ></el-cascader>
  </div>
</template>
<script>
  import {getProductCategoryShopTree as getTree} from "@/api/ptm/productCategoryShop.js";
  import {getCascaderSelectedKeys} from "@/utils/cascaderUtils.js";

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
          return false;
        }
      },
      placeholder: {
        type: String,
        default: function () {
          return "请选择店铺商品分类";
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
      if (this.value) {
        this.selectedKeys = this.value;
      }
    }
    ,
    methods: {
      async getData() {
        this.treeData = await getTree({tenantId: this.tenantId});
        this.setDisable(3, this.treeData);
        console.log("yPlatCategorySelect.arr", this.treeData)
      }
      ,
      change(value) {
        let ids = null;
        if (this.multiple) {
          ids = value.map(function (item) {
            return item[item.length - 1]
          }).join(",");
        } else {
          ids = value[value.length - 1];
        }

        this.$emit('input', ids);
        this.$emit('change', ids);
      }
      ,
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
