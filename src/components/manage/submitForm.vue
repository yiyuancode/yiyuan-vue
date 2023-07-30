<!-- 
    管理页面的用来提交表单的一个内容生成 
    默认两种类型，可以是form，也可以是formModel，也可以是自定义插槽
-->

<template>
        <a-form-model-item has-feedback
            :label="submitFormItem.label" prop="submitFormItem.">
            {{ submitFormItem }}
        </a-form-model-item>
    <!-- <div v-if="formType === 'formModel'">
        <a-form-model-item v-for="(submitFormItem, index) in submitFormList" :key="index" has-feedback
            :label="submitFormItem.label" prop="submitFormItem.">
            {{ submitFormItem }}
        </a-form-model-item>
    </div> -->
    <!-- <div v-else-if="formType === 'form'">

    </div> -->
</template>

<script>
// 有效的一个表单类型数组
const effectiveFormTypeArr = ["formModel", "form"];
export default {
    props: {
        formType: {
            type: String,
            default: "formModel",
        },
        submitFormObj: {
            type: Object,
            required: true
        }
    },
    created() {
        if (!effectiveFormTypeArr.includes(this.formType)) {
            Promise.reject("请传递有效的表单类型，默认是formModel");
        }
    }
}
</script>

<style lang="less" scoped></style>