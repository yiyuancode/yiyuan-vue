<template>
  <div style="height: 100%">
    <a-card style="width: 100%">
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col
            v-for="i in 10"
            :key="i"
            :span="8"
            :style="{ display: i < count ? 'block' : 'none' }"
          >
            <a-form-item :label="`Field ${i}`">
              <a-input v-model="form.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit"> 查询 </a-button>
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

    <a-card style="width: 100%; margin-top: 20px">
      <a-table
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 1500, y: 300 }"
      >
        <a slot="action">action</a>
      </a-table>
    </a-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' })
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 4;
    }
  },
  updated() {
    console.log('updated');
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
<style lang="less">
.ant-advanced-search-form {
  padding: 10px;

  .ant-form-item {
    display: flex;
  }

  .ant-form-item-control-wrapper {
    flex: 1;
  }
}
</style>
