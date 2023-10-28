<template>
  <div class="manage-container">
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商户id" prop="name">
        <a-input
          v-model="formData.tenantId"
          placeholder="请输入分类名称"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="关联分类" prop="categoryIds">
        <y-product-category-tree-select v-model="formData.categoryIds" />
      </a-form-model-item>
      <a-form-model-item label="品牌名称" prop="name">
        <a-input
          v-model="formData.name"
          placeholder="请输入 品牌名称"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="品牌图标" prop="icon">
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
   addProductBrand, editProductBrand
} from '@/api/ptm/productBrand';
import {
  getProductCategoryTreeList
} from '@/api/ptm/productCategory.js';
import UploadSngle from '@/components/uploadSngle';
import {getProductBrandDetail} from "../../../api/ptm/productBrand";
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
        categoryIds: [{ required: true, message: '请选择关联分类', trigger: 'blur' }],
        name: [{ required: true, message: '请填写品牌名称', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择品牌图标', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.genDataForEdit();
  },
  methods: {
    // 如果是编辑操作
    async genDataForEdit() {
      if (this.editId) {
        this.formData = await this.getProductCateDetail();
        // TODO 这里赋值需要处理
        this.formData.categoryIds = [this.formData.categoryIds];
      }
    },
    async getProductCateDetail() {
      return await getProductBrandDetail(this.editId);
    },
    onSubmitHandle() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.formData.id) {
            await editProductBrand(this.formData, this.formData.id);
            this.$emit('onSaveSubmit');
          } else {
            await addProductBrand(this.formData);
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
