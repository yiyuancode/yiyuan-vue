<template>
  <div class="manage-container">
    <a-form-model :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="商品分类">
        <a-cascader v-model="formData.ptmProductCategoryId" :options="forPramsData.productCateList" placeholder="请选择商品分类"/>
      </a-form-model-item>
      <a-form-model-item label="属性名">
        <a-input v-model="formData.attrKey" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle">
          Create
        </a-button>
        <a-button style="margin-left: 10px;">
          Cancel
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { getProductCategoryPageList } from '@/api/ptm/productCategory.js'
export default {
  name: "ProductAttrKeyEdit",
  props:{
    editData:{ // 待编辑数据
      type: Object,
      require: false
    }
  },
  data(){
    return{
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: {...this.editData},
      forPramsData:{ // 当前商品属性业务中用到的整体参数对象
        productCateList:[]
      }
    }
  },
  created(){
    this.getProductCateListHandle();
  },
  methods:{
    async getProductCateListHandle(){
      const currentProductCateList = await getProductCategoryPageList();
      this.forPramsData.productCateList = this.transformData(currentProductCateList.records);

    },
    transformData(data) {
      return data.map(item => {
          const transformedItem = {
            label: item.name,
            value: item.id,
          };

          if (item.level && item.level.length > 0) {
            transformedItem.children = this.transformData(item.level);
          }

          return transformedItem;
        });
    },
onSubmitHandle(){

    }
  }
}
</script>

<style scoped lang="less">
.manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
