<template>
  <div class="manage-container">
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
    123
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData:{

      }
    }
  },
  created() {
    
  },
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
.manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
