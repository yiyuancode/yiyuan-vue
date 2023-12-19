<template>
  <div class="manage-container">
    <a-form-model
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="用户名">
        <a-input
          v-model="formData.username"
          placeholder="请输入用户名"
          allowClear
        />
      </a-form-model-item>

      <a-form-model-item label="密码">
        <a-input
          v-model="formData.password"
          placeholder="请输入密码"
          allowClear
        />
      </a-form-model-item>

      <a-form-model-item label="平台类型">
        <a-select
          v-model="formData.platform"
          allowClear
          placeholder="选择平台类型"
        >
          <a-select-option :value="0"> 平台端</a-select-option>
          <a-select-option :value="1"> 租户端</a-select-option>
          <a-select-option :value="2"> 移动端</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle"> 创建 </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { addUser, editUser, getUserDetail } from '@/api/sys/user.js';

export default {
  name: 'UserKeyEdit',
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
      formData: {},
      forPramsData: {
        // 当前商品属性业务中用到的整体参数对象
        productCateList: []
      }
    };
  },
  created() {
    // this.getProductCateListHandle();
    this.genDataForEdit();
  },
  methods: {
    async genDataForEdit() {
      if (this.editId) {
        this.formData = await getUserDetail(this.editId);
        // this.formData.productCateId = [this.formData.ptmProductCategoryId];
      }
    },
    async onSubmitHandle() {
      this.formData.tenantId = 0; // 平台创建商户id为0
      if (this.editId) {
        await editUser(this.formData, this.formData.id);
        this.$emit('onSaveSubmit');
      } else {
        console.log(this.formData);
        await addUser(this.formData);
        this.$emit('onSaveSubmit');
      }
    }
  }
};
</script>
