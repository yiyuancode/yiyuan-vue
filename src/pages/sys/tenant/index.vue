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
    @onChange="tableChangeHandle"
  >
    <template slot="otherOperationsGOContainer">
      <AddForm
        ref="addForm"
        :props="addFormProps"
        @propsChange="addFormPropsChange"
        @propsSubmit="addFormPropsSubmit"
      ></AddForm>

      <a-button type="primary" @click="applyClick"> 商户入驻</a-button>
    </template>

    <template slot="otherOperationsContainer" slot-scope="{ record, text }">
      <a-button type="primary" @click="processClick(record, text)">
        入驻审核
      </a-button>
    </template>
  </ManagePage>
</template>

<script>
  import ManagePage from '@/components/manage/ManagePage.vue';
  import manage from '@/mixins/manage';
  import {columns, moduleConfig, permissionObj, renderObj} from './pageConfig';
  import AddForm from '@/components/addForm/AddForm.vue';

  export default {
    components: {
      ManagePage,
      AddForm
    },
    mixins: [manage({permissionObj, renderObj})],
    data() {
      return {
        columns,
        ...moduleConfig
      };
    },
    methods: {
      applyClick() {
        let data = {
          title: '商户入驻申请',
          show: true,
          loading: false,
          columns: this.filterColumns(columns, [
            'spmShopCityId',
            'name',
            'legalPersonName',
            'email',
            'phone',
            'detailedAddress',
            'socialCreditCode',
            'businessLicenseImage',
            'legalPersonIdFrontImage',
            'legalPersonIdBackImage',
            'remark'
          ]),
          groupSize: 2
        };
        this.$refs.addForm.onOpen(data);
      },
      async addFormPropsSubmit(data) {
        try {
          data.spmShopCityId = data.spmShopCityId.join(',');
          await this.module['applyTenant'](data);
          this.$refs.addForm.ok('申请提交成功');
          this.getData();
        } catch (e) {
          console.error(e);
          this.$refs.addForm.no();
        }
      },
      async processClick(record) {
        try {
          console.log('applyClick', record);
          this.applyClick();
          setTimeout(() => {
            this.$refs.addForm.setFormData(record);
          }, 300)


        } catch (e) {
          console.error(e);
        }
      },
      handleDetailModel(newModel) {
        newModel.spmShopCityId = newModel.spmShopCityId.split(',');
      }
    }
  };
</script>

<style lang="less" scoped></style>
