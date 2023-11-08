<template>
  <div class="manage-container">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="店铺类型名称" prop="name">
        <a-input
          v-model="formData.name"
          placeholder="请输入店铺类型名称"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺描述" prop="typeDesc">
        <a-input
          v-model="formData.typeDesc"
          placeholder="请输入店铺描述"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺合约" prop="typeContract">
        <a-input
          v-model="formData.typeContract"
          placeholder="请输入店铺合约"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="排序" prop="sort">
        <a-input-number
          v-model="formData.sort"
          placeholder="请输入数字排序"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="显示状态" prop="isShow">
        <a-switch v-model="formData.isShow" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import {
  addShopType,
  getShopTypeDetail,
  editShopType
} from '@/api/spm/shopType';
export default {
  props: {
    editId: {
      // 待编辑数据
      type: String,
      require: false
    }
  },
  data() {
    return {
      // 表单数据
      formData: {
        id: '',
        name: null,
        typeDesc: null,
        typeContract: null,
        isShow: true,
        sort: 0
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // 权限验证
      rules: {
        name: [
          { required: true, message: '请输入店铺类型名称', trigger: 'blur' }
        ],
        typeDesc: [
          { required: true, message: '请输入店铺描述', trigger: 'blur' }
        ],
        typeContract: [
          { required: true, message: '请输入店铺合约', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // 详情
    async getDetail() {
      if (this.editId) {
        let data = await getShopTypeDetail(this.editId);
        this.formData = data;
      }
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.editId) {
            //修改
            await editShopType(this.formData, this.editId);
            this.$message.success('修改成功');
            this.$emit('onSaveSubmit');
          } else {
            // 添加
            await addShopType(this.formData);
            this.$message.success('添加成功');
            this.$emit('onSaveSubmit');
          }

          this.onCancelHandle();
        } else {
          this.$message.error('校验未通过');
          return false;
        }
      });
    },
    // emit 关闭
    onCancelHandle() {
      this.$emit('onCancelSubmit');
      this.resetForm();
    }
  }
};
</script>
<style lang="less" scoped>
.manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
