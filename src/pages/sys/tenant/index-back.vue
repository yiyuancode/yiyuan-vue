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


    <template slot="table-spmShopCityIdZh" slot-scope="{ record }">
      {{record.spmShopCityIdZh}}
    </template>
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
        ...moduleConfig,
        //入驻申请表单字段
        applyFileds: [
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
        ]
      };
    },
    methods: {
      applyClick() {
        let data = {
          title: '商户入驻申请',
          show: true,
          loading: false,
          columns: this.filterColumns(columns, this.applyFileds),
          groupSize: 2,
          subMitMethod: "applyTenant",
        };
        this.$refs.addForm.onOpen(data);
      },
      async processClick(record) {
        try {
          console.log('applyClick', record);
          let data = {
            title: '商户入驻审核',
            show: true,
            loading: false,
            columns: this.filterColumns(columns, this.applyFileds),
            groupSize: 2,
            subMitMethod: "processTenant",
          };
          this.$refs.addForm.onOpen(data);
          setTimeout(() => {
            this.$refs.addForm.setFormData(record);
          }, 150)

        } catch (e) {
          console.error(e);
        }
      },
      async addFormPropsSubmit({propsTemp, data}) {
        try {
          data.spmShopCityId = data.spmShopCityId.join(',');
          await this.module[propsTemp.subMitMethod](data);
          this.$refs.addForm.ok('申请提交成功');
          this.getData();
        } catch (e) {
          console.error(e);
          this.$refs.addForm.no();
        }
      },

      handleDetailModel(newModel) {
        newModel.spmShopCityId = newModel.spmShopCityId.split(',');
      }
    }
  };
</script>

<style lang="less" scoped></style>
