<template>

  <ManagePage :columns="columns" :data="data" :pagination="pagination" :renderObj="renderObj"
              @onSave="saveHandle"
              @onSubmit="submitHandle" @onDelete="deleteHandle" @onSearch="searchHandle"
              @onReset="resetHandle"
              @onOtherEventChange="otherEventChangeHandle">

    <template slot="otherOperationsGOContainer">
      <AddForm
        ref="addForm"
        :props="addFormProps"
        @propsChange="addFormPropsChange"
        @propsSubmit="addFormPropsSubmit"
      ></AddForm>
      <a-button type="primary" @click="generateCodeClick"> 商户入驻</a-button>
    </template>
  </ManagePage>
</template>

<script>

  import ManagePage from '@/components/manage/ManagePage.vue';
  import manage from '@/mixins/manage';
  import {columns, moduleConfig, permissionObj} from './pageConfig';
  import AddForm from '@/components/addForm/AddForm.vue';

  export default {
    components: {
      ManagePage,
      AddForm
    },
    mixins: [manage({permissionObj})],
    data() {
      return {
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
          columns: columns,
          width: 450
        };
        this.$refs.addForm.onOpen(data);
      },
      addFormPropsSubmit(data) {
        console.log("addFormPropsSubmit", data)
      }

    },
  }
</script>

<style lang="less" scoped></style>
