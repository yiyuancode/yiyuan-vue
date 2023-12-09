<template>
  <div style="width: 100%;">

    <a-select v-if="!isSpan" v-model="selectedKeys"
              :placeholder="placeholder"
              :allowClear="allowClear"
              @change="change">
      <a-select-option v-for="(item) in options" :value="item.id" :key="item.id">
        {{ item.shopName }}
      </a-select-option>
    </a-select>
    <span v-else>
      {{optionsMap[value]}}
    </span>

  </div>
</template>
<script>
  import {getShopList as listPage} from "@/api/spm/shop.js";

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
          return true;
        }
      },
      placeholder: {
        type: String,
        default: function () {
          return "请选择店铺";
        }
      },
      isSpan: {
        type: Boolean,
        default: function () {
          return false;
        }
      },


    },
    data() {
      return {
        selectedKeys: undefined,
        options: [],
        optionsMap: {},
      };
    },
    watch: {
      // TODO 重复打开编辑商品偶尔几次才能渲染成功，此问题出现在商品分类和店铺分类 有时间一起确认
      value(newValue, oldValue) {
        console.log('newValue:', newValue);
        if (!newValue) {
          this.selectedKeys = undefined;
        }
      }
    },
    computed: {},
    async created() {
      if (!this.isSpan) {
        await this.getData();
        if (this.value) {
          this.selectedKeys = this.value
        }
      } else {
        this.getCache()
      }
    },
    methods: {
      async getData() {
        this.options = await listPage();
        this.setCache();
      },
      change(value, label, extra) {
        this.$emit('input', value);
        this.$emit('change', value);
      },
      setCache() {
        this.optionsMap = this.options.reduce((acc, obj) => {
          acc[obj.id] = obj.shopName;
          return acc;
        }, {});
        localStorage.setItem("yShopSelect", JSON.stringify(this.optionsMap))
      },
      getCache() {
        this.optionsMap = JSON.parse(localStorage.getItem("yShopSelect"))
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
