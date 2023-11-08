<template>

  <a-form-model ref="form" class="ant-advanced-search-form"
                :model="form"
                :rules="uRules"
  >
    <a-row :gutter="2">
      <a-col
        v-for="(item, index) in uColumns"
        :key="item.dataIndex"
        :span="span"
      >
        <template v-if="item.dataIndex">
          <a-form-model-item :label="`${item.title}`" :prop="item.dataIndex">
            <a-range-picker
              v-if="item.formType == `datePicker`"
              v-model="form[item.dataIndex]"
              allowClear
              showTime
              :placeholder="[`开始时间`, `结束时间`]"
            />


            <a-radio-group v-else-if="item.formType == `radioGroup`" v-model="form[item.dataIndex]">
              <a-radio :value="im3.value" v-for="(im3, ix3) in item.props.options"
                       :key="ix3">
                {{ im3.label }}
              </a-radio>

            </a-radio-group>


            <a-input
              v-if="!item.formType"
              v-model="form[item.dataIndex]"
              allowClear
              :placeholder="`请输入` + item.title"
            />
          </a-form-model-item>
        </template>
        <template v-else>
          <slot :name="item" v-bind="{ form }"></slot>
        </template>

      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          @click="onSubmit"
        >
          提交
        </a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="onCancel">
          取消
        </a-button>
      </a-col>
    </a-row>
  </a-form-model>

</template>
<script>
  import _ from 'lodash';

  export default {
    props: {
      props: {
        type: Array,
        default: function () {
          return [];
        }
      },
      scopedSlots: {
        type: Array,
        default: function () {
          return [];
        }
      },
      columns: {
        type: Array,
        default: function () {
          return [];
        }
      },
      loading: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      rules: {
        type: Object,
        default: function () {
          return {};
        }
      },
    },
    data() {
      return {
        form: {},
        expand: false,
        span: 24
      };
    },
    computed: {
      uColumns() {
        let columnsTemp = this.columns.filter((item) => {
          return !item.noAdd;
        });
        columnsTemp = [...columnsTemp, ...this.scopedSlots];
        return columnsTemp;
      },
      uRules() {
        let rules = {};
        let columnsTemp = this.columns.filter((item) => {
          return !item.noAdd;
        });
        columnsTemp.forEach((item) => {
          rules[item.dataIndex] = item.rules;
        })
        rules = {...rules, ...this.rules}
        return rules;
        // return this.expand ? this.uColumns.length : 4;
      }
    },
    created() {

    },
    methods: {
      onSubmit() {
        console.log('this.form', this.form);
        let formTemp = _.cloneDeep(this.form);

        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit('onSubmit', formTemp);
            this.resetFields()
          } else {
            console.log('表单验证失败,请仔细检查表单项!!');
            return false;
          }
        });

      },

      onCancel() {
        this.$emit('onCancel',);
      },

      handleReset() {
        // this.$refs.form.resetFields();
        this.form = {};
        console.log('this.form', this.form);
        this.$emit('search', this.form);
      },

      toggle() {
        this.expand = !this.expand;
      },
      resetFields() {
        console.log("子组件resetFields")
        this.form = {};
        this.$refs.form.resetFields()
      },
      setFields(form) {
        console.log("子组件resetFields")
        this.form = form;
        // this.$refs.form.resetFields()
      }
    }
  };
</script>
<style lang="less" scoped>
  .ant-advanced-search-form {
    padding: 10px;

    /deep/ .ant-form-item {
      display: flex;

      .ant-form-item-label {
        width: 100px;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 显示省略符号 */
      }

      .ant-form-item-control-wrapper {
        flex: 1;

        .ant-calendar-picker {
          width: 100% !important;
        }
      }
    }
  }

  .y-tools {
    height: 100px;
    width: 100%;
    background: red;
  }

  .y-table {
    margin: 20px;
  }
</style>
