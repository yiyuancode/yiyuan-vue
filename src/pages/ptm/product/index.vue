<template>
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    :submitModalObj="{ modalWidth: 1200 }"
    @onSave="saveHandle"
    @onSubmit="addProductHandler"
    @onDelete="deleteHandle"
    @onSearch="searchHandle"
    @onReset="resetHandle"
    @onChange="tableChangeHandle"
  >
    <span slot="huaheshang-skuForm">
      <a-form-model-item
        label="商品SKU"
        required
        :help="skuForm.help"
        :validateStatus="skuForm.validateStatus"
      >
        <a-table
          :dataSource="myTestData.dataSource"
          :columns="myTestData.columns"
        />
      </a-form-model-item>
    </span>
    <span slot="huaheshang-skuForm1">
      <a-form-model-item label="商品skuForm1" required>
        <a-table
          :dataSource="myTestData.dataSource"
          :columns="myTestData.columns"
        />
      </a-form-model-item>
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
    return {
      columns,
      ...moduleConfig,
      skuForm: {
        help: '',
        validateStatus: ''
      },
      myTestData: {
        dataSource: [
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street'
          },
          {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street'
          }
        ],

        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
          }
        ]
      }
    };
  },

  methods: {
    addProductHandler(data) {
      // data.formRef.validateField();
      //非常规表单组件数据校验失败
      if (data == false) {
        this.skuForm.help = '请正确选择sku';
        this.skuForm.validateStatus = 'error';
        data.fail();
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
