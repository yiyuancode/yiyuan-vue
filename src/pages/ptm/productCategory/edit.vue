<template>
  <div class="manage-container">
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="父级分类" prop="pid">
        <a-cascader
          v-model="formData.pid"
          :options="forPramsData.productCateList"
          placeholder="请选择商品分类"
        />
      </a-form-model-item>
      <a-form-model-item label="分类名称" prop="name">
        <a-input v-model="formData.name" />
      </a-form-model-item>
      <a-form-model-item label="分类图标" prop="icon">
        <UploadSngle
          v-model="formData.icon"
          @UploadSngle="(fileUrl) => UploadSngle(fileUrl, formData)"
        ></UploadSngle>
      </a-form-model-item>
      <a-form-model-item label="层级" prop="level">
        <a-select v-model="formData.level" default-value="1">
          <a-select-option :value="1">
            一级
          </a-select-option>
          <a-select-option :value="2">
            二级
          </a-select-option>
          <a-select-option :value="3">
            三级
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle"> Create </a-button>
        <a-button style="margin-left: 10px"> Cancel </a-button>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>

<script>
import { getProductCategoryPageList, addProductCategory, editProductCategory } from '@/api/ptm/productCategory.js';
import UploadSngle from '@/components/uploadSngle';
export default {
  name: 'ProductAttrKeyEdit',
  components:{ UploadSngle },
  props: {
    editData: {
      // 待编辑数据
      type: Object,
      require: false
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: { ...this.editData, tenantId:0 },
      forPramsData: {
        // 当前商品属性业务中用到的整体参数对象
        productCateList: []
      },
      rules: {
        pid: [
          {required: true, message: '请选择父级分类', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请填写分类名称', trigger: 'blur'},
        ],
        icon: [
          {required: true, message: '请选择分类图标', trigger: 'blur'},
        ],
        level: [
          {required: true, message: '请选择层级', trigger: 'blur'},
        ]
      },
    };
  },
  created() {
    this.getProductCateListHandle();
    this.genDataForEdit();
  },
  methods: {
    async getProductCateListHandle() {
      const currentProductCateList = await getProductCategoryPageList();
      this.forPramsData.productCateList = this.transformData(
        currentProductCateList.records
      );
    },
    transformData(data) {
      return data.map((item) => {
        const transformedItem = {
          label: item.name,
          value: item.id
        };

        if (item.level && item.level.length > 0) {
          transformedItem.children = this.transformData(item.level);
        }

        return transformedItem;
      });
    },
    // 如果是编辑操作
    genDataForEdit(){
      if(this.formData.id){
        this.formData.level = this.formData.level.value;
        console.log('this.formData:', this.formData)
        this.$forceUpdate();
      }
    },
    onSubmitHandle() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.formData.pid = this.formData.pid[0]
          console.log('this.formData:', this.formData)
          if(this.formData.id){
            await editProductCategory(this.editData, this.editData.id);
            this.$emit('onSaveSubmit')
          }else{
            await addProductCategory(this.formData);
            this.$emit('onSaveSubmit')
          }

        } else {
          console.log('维护商品分类失败');
          return false;
        }
      });

    },
    UploadSngle(fileUrl, item) {
      item.icon = fileUrl;
    },
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
