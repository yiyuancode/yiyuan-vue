<template>
  <a-card style="width: 100%">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSearch"
    >
      <a-row :gutter="24">
        <a-col
          v-for="(item, index) in uColumns"
          :key="item.dataIndex"
          :span="span"
          :style="{ display: index < count ? 'block' : 'none' }"
        >
          <a-form-item :label="`${item.title}`">
            <a-input v-model="form[item.dataIndex]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit"> 查询</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            {{ expand ? '收起' : '展开' }}
            <a-icon :type="expand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script>
export default {
  props: {
    props: {
      type: Array,
      default: function () {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      form: {},
      expand: false,
      span: 6
    };
  },
  computed: {
    uColumns() {
      return this.columns.filter((item) => {
        return !item.noSearch;
      });
    },
    count() {
      return this.expand ? this.uColumns.length : 4;
    }
  },
  created() {
    // setTimeout(() => {
    //   this.columns = this.convertTo2DArray(this.props, this.groupSize);
    //   this.loadCascaderOps();
    // }, 150);
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
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
      width: 80px;
      white-space: nowrap; /* 防止文本换行 */
      overflow: hidden; /* 超出部分隐藏 */
      text-overflow: ellipsis; /* 显示省略符号 */
    }
  }

  .ant-form-item-control-wrapper {
    flex: 1;
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
