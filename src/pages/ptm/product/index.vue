<template>
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    :submitModalObj="{modalWidth:1200}"
    @onSave="saveHandle"
    @onSubmit="addProductHandler"
    @onDelete="deleteHandle"
    @onSearch="searchHandle"
    @onReset="resetHandle"
    @onChange="tableChangeHandle"
  >
      <span slot="huaheshang-skuForm">
<!--        <a-form-model-item label="商品SKU" has-feedback prop="skuForm">-->
         <a-table :dataSource="myTestData.dataSource" :columns="myTestData.columns" />
<!--        </a-form-model-item>-->

      </span>
      <span slot="huaheshang-skuForm1">
        我自由了
      </span>

  </ManagePage>
</template>

<script>
import ManagePage from '@/components/manage/ManagePage.vue';
import manageProduct from '@/mixins/manage_product';
import { columns, moduleConfig, permissionObj } from './pageConfig';

export default {
  name: 'product',
  components: {
    ManagePage
  },
  mixins: [manageProduct({ permissionObj })],
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      columns,
      ...moduleConfig,
      myTestData:{
        dataSource: [
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
          },
        ],

        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
        ],
      },
      mytestRule:{
        rules: {
          skuForm: [{ required: true,validator: validatePass2, trigger: 'change' }]
        },
      }
    };
  },

  methods: {
    addProductHandler(){
      console.log("花和尚花和尚花和尚花和尚花和尚")
    }
  }
};
</script>

<style lang="less" scoped></style>
