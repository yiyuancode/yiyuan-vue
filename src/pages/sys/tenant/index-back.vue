<template>
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    @onSave="saveHandle"
    @onSubmit="submitHandle"
    @onDelete="deleteHandle"
    @onSearch="searchHandle"
    @onReset="resetHandle"
    @onOtherEventChange="otherEventChangeHandle"
  >
    <template slot="otherOperationsGOContainer">
      <AddForm
        ref="addForm"
        :props="addFormProps"
        @propsChange="addFormPropsChange"
        @propsSubmit="addFormPropsSubmit"
      ></AddForm>

      <a-button type="primary" @click="generateCodeClick"> 商户入驻</a-button>
    </template>

    <template slot="otherOperationsContainer" slot-scope="{ record }">
      <a-button type="primary" @click="generateCodeClick(record)">
        入驻审核</a-button
      >
    </template>
  </ManagePage>
</template>

<script>
import ManagePage from '@/components/manage/ManagePage.vue';
import manage from '@/mixins/manage';
import {
  applyColumns,
  columns,
  moduleConfig,
  permissionObj
} from './pageConfig';
import AddForm from '@/components/addForm/AddForm.vue';

export default {
  components: {
    ManagePage,
    AddForm
  },
  mixins: [manage({ permissionObj })],
  data() {
    return {
      renderObj: {
        editBtn: { isOpen: false }
      },
      columns,
      ...moduleConfig
    };
  },
  methods: {
    generateCodeClick() {
      let data = {
        title: '商户入驻申请',
        show: true,
        loading: false,
        columns: applyColumns,
        groupSize: 2
      };
      this.$refs.addForm.onOpen(data);
    },
    async addFormPropsSubmit(data) {
      try {
        console.log('addFormPropsSubmit', data);
        data.spmShopCityId = data.spmShopCityId.join(',');
        let resp = await this.module['applyTenant'](data);
        console.log('applyTenant.resp', resp);
        this.$refs.addForm.ok('申请提交成功');
        this.getData();
      } catch (e) {
        console.error(e);
        this.$refs.addForm.no();
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
