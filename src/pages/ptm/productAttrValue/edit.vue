<template>
  <div class="manage-container">
    <a-form-model
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商户">
        <y-api-select
          v-model="formData.tenantId"  :apiConfig="tenantIdApiConfig" @change="tenantIdChange"/>
      </a-form-model-item>
      <a-form-model-item label="属性名">
        <y-api-select
          v-model="formData.ptmProductAttrKeyId"  :apiConfig="attrKeyApiConfig" />
      </a-form-model-item>
      <a-form-model-item label="属性名">
        <a-input
          v-model="formData.attrValue"
          placeholder="请输入属性名"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle"> {{ editId ? '编辑':'创建'}} </a-button>
        <a-button style="margin-left: 10px" @click="onCancel"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { getShopList } from "@/api/spm/shop.js";
import { getProductAttrValueDetail } from "@/api/ptm/productAttrValue";
import { getProductAttrKeyList } from "@/api/ptm/productAttrKey";
import {addProductAttrValue, editProductAttrValue} from "@/api/ptm/productAttrValue";
export default {
  name: 'ProductAttrValueEdit',
  props: {
    editId: {
      type: String,
      require: false
    }
  },
  data(){
    return{
      tenantIdApiConfig:{   // 商户列表
        apiFun: getShopList,
        parms: {},
        objMap: {value: 'id', label: 'shopName'}
      },
      attrKeyApiConfig:{   // 属性名列表
        apiFun: getProductAttrKeyList,
        parms: {  },
        objMap: {value: 'id', label: 'attrKey'}
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: {
        tenantId: undefined,
        productCateId: null,
        attrValue: null
      },
    }
  },
  created(){
    this.getProductCateListHandle();
    this.genDataForEdit();
  },
  methods: {
    genDataForEdit: async function () {
      if (this.editId) {
        this.formData = await getProductAttrValueDetail(this.editId);
        // this.formData.productCateId = this.formData.ptmProductCategoryId;
        // console.log('this.formData.productCateId:',this.formData.productCateId);
      }
    },
    async onSubmitHandle() {
      if (this.editId) {
        await editProductAttrValue(this.formData, this.formData.id);
        this.$emit('onSaveSubmit');
      } else {
        await addProductAttrValue(this.formData);
        this.$emit('onSaveSubmit');
      }
    },
    onCancel(){
      this.$emit("onCancel")
    },
    async tenantIdChange(tenantId) {
      this.attrKeyApiConfig.parms.tenantId = tenantId
    },
  }
}
</script>

<style scoped lang="less">

</style>
