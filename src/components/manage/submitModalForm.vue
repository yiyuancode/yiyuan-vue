<template>
  <div class="submit-form">
    <!-- 可以使用ant-design-vue的a-form-model -->
    <a-form-model
      v-if="mode === 'formModel'"
      :ref="formRef"
      :model="model"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <template v-for="(submitFormItem, index) in uSubmitFormList">
        <template v-if="submitFormItem.formType == 'customerForm'">
          <template>
            <slot :name="submitFormItem.prop"></slot>
          </template>
        </template>

        <a-form-model-item
          v-else
          :key="index"
          has-feedback
          :label="submitFormItem.label"
          :prop="submitFormItem.prop"
        >
          <FormItem
            v-model="model[submitFormItem.prop]"
            :formType="submitFormItem.formType"
            :props="submitFormItem.props"
          />
        </a-form-model-item>
      </template>
    </a-form-model>

    <!-- 也可以使用ant-design-vue的a-form -->
    <a-form v-if="mode === 'form'"> </a-form>
  </div>
</template>

<script>
const undefinedPropArr = ['datePicker', 'rangePicker', 'select'];

import FormItem from '@/components/tool/FormItem';

export default {
  components: {
    FormItem
  },

  props: {
    mode: {
      type: String,
      default: 'formModel'
    },
    model: {
      type: Object,
      require: true
    },
    rules: {
      type: Object
    },
    submitFormList: {
      type: Array,
      required: true
    },
    formRef: {
      type: String,
      required: true
    },
    labelCol: {
      type: Object,
      default: () => ({ span: 6 })
    },
    wrapperCol: {
      type: Object,
      default: () => ({ span: 18 })
    }
  },
  // data() {
  //     return {
  //         labelCol: { span: 6 },
  //         wrapperCol: { span: 18 },
  //     }
  // },
  computed: {
    uSubmitFormList() {
      return this.submitFormList.map((sf) => {
        // props进行处理
        if (!sf.props) {
          sf.props = {};
        }

        // lable进行处理
        if (sf.label) {
          sf.props.placeholder = sf.props.placeholder || sf.label;
        }

        if (!sf.ref && sf.prop) {
          sf.ref = sf.prop;
        }

        // value进行处理
        if (!sf.value) {
          if (undefinedPropArr.includes(sf.formType)) {
            sf.value = undefined;
          } else {
            sf.value = '';
          }
        }

        return sf;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
