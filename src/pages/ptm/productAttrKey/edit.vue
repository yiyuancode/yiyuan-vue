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
import { getProductCategoryList } from '@/api/ptm/productCategory.js';
import { addProductAttrKey, getProductAttrKeyDetail, editProductAttrKey } from '@/api/ptm/productAttrKey.js';
export default {
  name: 'ProductAttrKeyEdit',
  props: {
    editId: {
      // 待编辑数据
      type: String,
      require: false
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: {  },
      forPramsData: {
        // 当前商品属性业务中用到的整体参数对象
        productCateList: []
      }
    };
  },
  created() {
    this.getProductCateListHandle();
    this.genDataForEdit();
  },
  methods: {
    async getProductCateListHandle() {
      // 获取数据库分类数据
      const currentProductCateList = await getProductCategoryList();
      // 将数据用前端的方式转换成树形结构，后期页提供了树形节后的api 但是这里还是使用前端的转换方式练习下前端JS逻辑，生产系统建议使用后端生成的tree结构，减少浏览器资源消耗
      let productCateTreeData = this.buildTree(currentProductCateList, '0');
      // 手动set 一个0=根目录
      this.forPramsData.productCateList = [
        ...productCateTreeData
      ];
    },
    // 构建树形结构
    buildTree(data, pid) {
      const tree = [];
      for (const item of data) {
        if (item.pid === pid) {
          const children = this.buildTree(data, item.id);
          const node = { label: item.name, value: item.id };
          if (children.length > 0) {
            node.children = children;
          }
          tree.push(node);
        }
      }

      return tree;
    },

    async genDataForEdit(){
      if(this.editId){
        this.formData = await getProductAttrKeyDetail(this.editId);
        this.formData.productCateId = [this.formData.ptmProductCategoryId];
      }
    },
    async onSubmitHandle() {
      this.formData.tenantId = 0; // 平台创建商户id为0
      if(this.editId){
        await editProductAttrKey(this.formData, this.formData.id);
        this.$emit('onSubmitHandleSuccess');
      }else{
        await addProductAttrKey(this.formData);
        this.$emit('onSubmitHandleSuccess');
      }

    }
  }
};
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
