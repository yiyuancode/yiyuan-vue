<template>
  <div style="width: 100%">
    <a-range-picker
      v-model="time"
      allowClear
      showTime
      :placeholder="[`开始时间`, `结束时间`]"
      @openChange="openChange"
    />
  </div>
</template>
<script>
import { getShopList } from '@/api/spm/shop.js';

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
        return '请选择店铺';
      }
    }
  },
  data() {
    return {
      time: []
    };
  },
  computed: {},
  async created() {
    await this.getData();
    if (this.value) {
      this.selectedKeys = this.value;
    }
    //
  },
  methods: {
    async getData() {
      this.options = await getShopList();
      console.log('this.options', this.options);
    },

    openChange() {}
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
