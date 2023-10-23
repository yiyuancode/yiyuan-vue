<template>
  <div class="manage-container">
    <a-form-model
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商品分类">
        <a-cascader
          v-model="formData.productCateId"
          :options="forPramsData.productCateList"
          placeholder="请选择商品分类"
        />
      </a-form-model-item>
      <a-form-model-item label="属性名">
        <a-input v-model="formData.attrKey" placeholder="请输入属性名" allowClear/>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle"> 创建 </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: "EditProduct",
  props: {
    editId: {
      // 待编辑数据
      type: String,
      require: false
    }
  },
  data(){
    return{
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: {
      "tenantId": "string",
      "tenantCategoryId": "string",
      "shopCategoryId": "string",
      "brandId": "string",
      "guaranteeIds": "string",
      "tempId": "string",
      "image": "string",
      "sliderImage": "string",
      "videoLink": "string",
      "name": "string",
      "title": "string",
      "keyword": "string",
      "goodsDesc": "string",
      "unitName": "string",
      "sales": 0,
      "fictiSales": 0,
      "browse": 0,
      "codePath": "string",
      "tenantSort": 0,
      "isSub": true,
      "isAudit": true,
      "auditStatus": "NO_NEED_FOR_REVIEW",
      "skuList": [
      {
        "id": "string",
        "tenantId": "string",
        "ptmProductId": "string",
        "sku": "string",
        "stock": 0,
        "salePrice": 0,
        "crossedPrice": 0,
        "costPrice": 0,
        "isShow": true,
        "createTime": "string",
        "createTimeStart": "string",
        "createTimeEnd": "string",
        "updateTime": "string",
        "updateTimeStart": "string",
        "updateTimeEnd": "string",
        "createUser": "string",
        "updateUser": "string"
      }
    ]
      },
      forPramsData: {
        productCateList: []
      }
    }
  },
  created(){

  },
  methods:{
    // 商品维护表单提交方法，编辑和创建
    onSubmitHandle(){

    }
  }
}
</script>

<style scoped lang="less">

</style>
