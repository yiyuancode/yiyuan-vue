<template>
<<<<<<< HEAD
  <div style="width: 100%">
    <a-select
      v-model="selectedKeys"
      :allowClear="allowClear"
      :placeholder="placeholder"
      mode="multiple"
      @change="change"
    >
      <a-select-option v-for="item in options" :key="item.id" :value="item.id">
=======
  <div style="width: 100%;">
    <a-select :allowClear="allowClear"
              :placeholder="placeholder"
              :disabled="!tenantId"
              @change="change"
              mode="multiple"
              v-model="selectedKeys">
      <a-select-option :key="item.id" :value="item.id" v-for="(item) in options">
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
        {{ item.name }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
import { getProductGuaranteeList as listGet } from '@/api/ptm/productGuarantee.js';

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
        return '请选择保障服务';
      }
    },
    tenantId: {
      type: String,
      default: function () {
        return null;
      }
    }
  },
  data() {
    return {
      selectedKeys: undefined,
      options: []
    };
  },
  computed: {},
  async created() {
    if (this.tenantId) {
      await this.getData();
    }
    if (this.value) {
      this.selectedKeys = this.value.split(',');
    }
    //
  },
  methods: {
    async getData() {
      this.options = await listGet({ tenantId: this.tenantId });
      console.log('this.options', this.options);
    },
    change(value, label, extra) {
      this.$emit('input', value.join(','));
      this.$emit('change', value.join(','));
      console.log('change', value.join(','));
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
