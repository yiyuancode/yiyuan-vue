<template>
  <ManagePage
    ref="managePage"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    @onSave="saveHandle"
    @onSubmit="submitHandle"
    @onDelete="deleteHandle"
    @onSearch="searchHandle"
    @onReset="resetHandle"
  >
    <template slot="otherOperationsGOContainer">
      <AddForm
        ref="addForm"
        :props="addFormProps"
        @propsChange="addFormPropsChange"
        @propsSubmit="generateCodeSubmit"
      ></AddForm>
      <a-button type="primary" @click="refreshClick"> 更新数据库表 </a-button>
      <a-button type="primary" @click="generateCodeClick"> 生成代码 </a-button>
    </template>
  </ManagePage>
</template>

<script>
import AddForm from '@/components/addForm/AddForm.vue';
import ManagePage from '@/components/manage/ManagePage.vue';
import manage from '@/mixins/manage';
import { columns, moduleConfig } from './pageConfig';

export default {
  components: {
    ManagePage,
    AddForm
  },
  mixins: [manage()],
  data() {
    return {
      columns,
      ...moduleConfig
    };
  },

  methods: {
    async refreshClick() {
      let resp = await this.module.refreshTable();
      this.$message.success('刷新成功');
      console.log('  this.module', resp);
    },
    generateCodeClick() {
      let ids = this.$refs.managePage.getIds();
      if (!ids) {
        this.$message.error('请至少选择一条表记录');
        return;
      }
      this.addFormProps = {
        title: '生成代码',
        show: true,
        loading: false,
        columns: [
          {
            title: '根包名',
            dataIndex: 'parentPackageName',
            key: 'parentPackageName',
            rules: [
              { required: true, message: '请输入根包名', trigger: 'blur' }
            ]
          },
          {
            title: '一级目录名称',
            dataIndex: 'firstLevelMenuZh',
            key: 'firstLevelMenuZh',
            rules: [
              { required: true, message: '请输入一级目录名称', trigger: 'blur' }
            ]
          },
          {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            rules: [{ required: true, message: '请输入作者', trigger: 'blur' }]
          }
        ]
      };
      console.log(' this.$refs.selectedRows', ids);
    },
    async generateCodeSubmit(data) {
      // let _this = this;
      try {
        let ids = this.$refs.managePage.getIds();
        data = { ...data, ids };
        await this.module.generateCodeTable(data);
        this.$refs.addForm.ok('生成代码成功');
      } catch (e) {
        console.error('erro', e);
        this.$refs.addForm.no('生成代码失败');
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
