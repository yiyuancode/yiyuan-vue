<template>
  <div class="manage-container">
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商户" prop="tenantId">
        <y-shop-select v-model="formData.tenantId" placeholder="商户|不选为平台分类"></y-shop-select>
      </a-form-model-item>
      <a-form-model-item label="平台父级分类" prop="pid">
<!--        <a-cascader-->
<!--          v-model="formData.pid"-->
<!--          :options="forPramsData.productCateList"-->
<!--          changeOnSelect-->
<!--          placeholder="请选择商品分类"-->
<!--          @change="onProductCateOptionSelected"-->
<!--        />-->
<!--        <y-product-category-select v-model="formData.pid" placeholder="平台分类|不选为根目录"></y-product-category-select>-->
        <y-plat-category-select v-model="formData.pid" placeholder="平台分类|不选为根目录"></y-plat-category-select>
      </a-form-model-item>
      <a-form-model-item label="平台分类名称" prop="name">
        <a-input
          v-model="formData.name"
          placeholder="请输入平台分类名称"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="分类图标" prop="icon">
        <UploadSngle
          v-model="formData.icon"
          @UploadSngle="(fileUrl) => UploadSngle(fileUrl, formData)"
        ></UploadSngle>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle">{{
          editId ? '编辑' : '创建'
        }}</a-button>
        <a-button style="margin-left: 10px" @click="onCancelHandle">
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import {
  getProductCategoryList,
  addProductCategory,
  editProductCategory,
  getProductCategoryDetail
} from '@/api/ptm/productCategory.js';
import UploadSngle from '@/components/uploadSngle';
export default {
  name: 'ProductCateEdit',
  components: { UploadSngle },
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
      formData: { tenantId: 0 },
      forPramsData: {
        // 当前商品属性业务中用到的整体参数对象
        productCateList: []
      },
      rules: {
        name: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择分类图标', trigger: 'blur' }],
        level: [{ required: true, message: '请选择层级', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.getProductCateListHandle();
    this.genDataForEdit();
  },
  methods: {
    onProductCateOptionSelected(op) {
      if (op) {
        this.formData.level = op.length;
      }
    },
    async getProductCateListHandle() {
      // 获取数据库分类数据
      const currentProductCateList = await getProductCategoryList();
      // 将数据用前端的方式转换成树形结构，后期页提供了树形节后的api 但是这里还是使用前端的转换方式练习下前端JS逻辑，生产系统建议使用后端生成的tree结构，减少浏览器资源消耗
      let productCateTreeData = this.buildTree(currentProductCateList, '0');
      // 手动set 一个0=根目录
      this.forPramsData.productCateList = [
        ...[{ value: '0', label: '根目录' }],
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
    // 如果是编辑操作
    async genDataForEdit() {
      if (this.editId) {
        this.formData = await this.getProductCateDetail();
        this.formData.pid = [this.formData.pid];
      }
    },
    async getProductCateDetail() {
      return await getProductCategoryDetail(this.editId);
    },
    onSubmitHandle() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if(this.formData.pid.length > 0){
            this.formData.pid = this.formData.pid[0];
          }
          if (this.formData.id) {
            await editProductCategory(this.formData, this.formData.id);
            this.$emit('onSaveSubmit');
          } else {
            console.log("this.formData",this.formData)
            await addProductCategory(this.formData);
            this.$emit('onSaveSubmit');
          }
        } else {
          console.log('维护商品分类失败');
          return false;
        }
      });
    },
    onCancelHandle() {
      this.$emit('onCancelSubmit');
    },
    UploadSngle(fileUrl, item) {
      item.icon = fileUrl;
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
