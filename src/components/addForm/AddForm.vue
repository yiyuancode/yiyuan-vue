<template>
  <div>
    <a-drawer
      :title="props.title"
      :width="props.width ? props.width : 750"
      :visible="props.show"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical">
        <a-spin :spinning="props.loading">
          <a-row v-for="(im, ix) in uColumns" :key="ix"  :gutter="16">
            <a-col v-for="(im2, ix2) in im" :key="ix2" :span="12" >
              <a-form-item :label="im2.title">
                <a-radio-group
                
                  v-if="im2.formType == `radioGroup`"
                  v-decorator="[
                    im2.dataIndex,
                    {
                      rules: [
                        {
                          required: im2.rules,
                          message: `请选择${
                            im2.placeholder ? im2.placeholder : im2.title
                          }`
                        }
                      ]
                    }
                  ]"
                  :disabled="im2.disabled ? im2.disabled : false"
                  :placeholder="`请选择${
                    im2.placeholder ? im2.placeholder : im2.title
                  }`"
                  
                >
                  <a-radio-button
                    v-for="(im3, ix3) in im2.props.options"
                    :key="ix3"
                    :value="im3.value"
                  >
                    {{ im3.label }}
                  </a-radio-button>
                </a-radio-group>

                <a-select
                  v-else-if="im2.formType == `Select`"
                  v-decorator="[
                    im2.dataIndex,
                    {
                      rules: [
                        {
                          required: im2.rules,
                          message: `请选择${
                            im2.placeholder ? im2.placeholder : im2.title
                          }`
                        }
                      ]
                    }
                  ]"
                  allowClear
                  show-search
                  :disabled="im2.disabled ? im2.disabled : false"
                  :placeholder="`请选择${
                    im2.placeholder ? im2.placeholder : im2.title
                  }`"
                  :default-active-first-option="false"
                  :filter-option="false"
                 
                  @change="
                    (val, option) =>
                      handleChangeSelect(val, im2.dataIndex, im2, option)
                  "
                >
                  <!-- 	<a-icon slot="suffixIcon" type="search" /> -->
                  <a-select-option
                    v-for="(im3, ix3) in im2.props.options"
                    :key="ix3"
                    :value="im3.value"
                  >
                    {{ im3.label }}
                  </a-select-option>
                </a-select>
                <a-date-picker
                  v-else-if="im2.formType == `datePicker`"
                  v-decorator="[
                    im2.dataIndex,
                    {
                      rules: [
                        {
                          required: im2.rules,
                          message: `请选择${
                            im2.placeholder ? im2.placeholder : im2.title
                          }`
                        }
                      ]
                    }
                  ]"
                  :style="im2.props.style"
                  :show-time="im2.props.showTime"
                  format="YYYY-MM-DD HH:mm:ss"
                />
                <a-input
                  v-else
                  v-decorator="[
                    im2.dataIndex,
                    {
                      rules: [
                        {
                          required: im2.rules,
                          message: `请输入${
                            im2.placeholder ? im2.placeholder : im2.title
                          }`
                        }
                      ]
                    }
                  ]"
                  :placeholder="`请输入${
                    im2.placeholder ? im2.placeholder : im2.title
                  }`"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-spin>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary"  :loading="props.loading" @click="onSubmit">
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import _ from 'lodash';

export default {
  props: {
    props: {
      type: Object,
      default: function () {
        return {
          title: null,
          show: false,
          loading: false,
          columns: [],
          record: {}
        };
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false
    };
  },
  computed: {
    uColumns() {
      let columns = _.cloneDeep(this.props.columns);
      columns = columns?.filter((im) => {
        return !im.noAdd || !im.noEdit;
      });
      return this.convertTo2DArray(columns, 2);
    }
  },
  methods: {
    handleChangeSelect(val, dataIndex, im2, option) {
      console.log('handleSearchSelect.val', val);
      console.log('handleSearchSelect.dataIndex', dataIndex);
      console.log('handleSearchSelect.im2', im2);
      console.log('handleSearchSelect.option', option);
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let propsTemp = _.cloneDeep(this.props);
          propsTemp.loading = true;
          this.$emit('propsChange', propsTemp);
          this.$emit('propsSubmit', values);
          propsTemp.loading = true;
          this.$parent;
          // this.addFormProps.loading = false;
        }
      });
    },
    ok(msg) {
      let propsTemp = _.cloneDeep(this.props);
      propsTemp.loading = false;
      propsTemp.show = false;
      this.form.resetFields();
      this.$emit('propsChange', propsTemp);
      this.$message.success(msg);
    },
    no(msg) {
      let propsTemp = _.cloneDeep(this.props);
      propsTemp.loading = false;
      propsTemp.show = true;
      this.$emit('propsChange', propsTemp);
      this.$message.error(msg);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      let propsTemp = _.cloneDeep(this.props);
      propsTemp.show = false;
      this.$emit('propsChange', propsTemp);
    },
    //一维数组转成二维数组
    convertTo2DArray(arr, groupSize) {
      var result = [];
      for (var i = 0; i < arr?.length; i += groupSize) {
        result.push(arr.slice(i, i + groupSize));
      }
      return result;
    }
  }
};
</script>
