<template>
  <a-drawer
    :title="editConfig.title"
    :visible="editConfig.visible"
    :width="800"
    @close="onCancel"
  >
    <a-spin :spinning="spinning">
      <y-edit-form
        :columns="editConfig.columns"
        :key="editId"
        :rules="rules"
        :scopedSlots="['tenantId']"
        @onCancel="onCancel"
        @onSubmit="onSubmit"
        ref="editForm"
      >
        <a-form-model-item label="商户" prop="tenantId" slot="tenantId" slot-scope="{ form }">
          <y-shop-select v-model="form.tenantId"/>
        </a-form-model-item>
      </y-edit-form>
    </a-spin>
  </a-drawer>
</template>

<script>
  import {
    addFreightTempPrice as addPost,
    editFreightTempPrice as editPost,
    getFreightTempPriceDetail as detailGet
  } from '@/api/ftm/freightTempPrice.js';

  export default {
    name: 'edit',
    // components: {UploadSngle},
    props: {
      editConfigProps: {
        type: Object,
        default: function () {
          return {};
        }
      },
      editId: {
        // 待编辑数据
        type: String,
        require: false
      }
    },
    data() {
      return {
        editConfig: {},
        rules: {
          // tenantId: [{required: true, message: "请选择商户"}],
        },
        spinning: false


      };
    },
    created() {
      this.editConfig = this.editConfigProps
      this.init();
    },
    mounted() {
    },
    methods: {
      // 如果是编辑操作
      async init() {
        if (this.editId) {
          this.spinning = true;
          this.formData = await detailGet(this.editId);
          this.$refs.editForm.setFields(this.formData);
          this.spinning = false;
          // this.formData.categoryIds = [this.formData.categoryIds];
        }
      },
      async onSubmit(formData) {
        console.log("onSubmit", formData)
        this.editConfig.visible = false;
        if (this.editId) {
          await editPost(formData, this.editId);
        } else {
          await addPost(formData);
        }
        this.$emit("ok")

      },
      onCancel() {
        this.editConfig.visible = false;
        this.$refs.editForm.resetFields();
      },
      UploadSngle(fileUrl, item) {
        item.icon = fileUrl;
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

  .content-container {
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
