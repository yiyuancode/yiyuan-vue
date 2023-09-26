<template>
  <div :class="advanced ? 'search' : null">
    <a-form :form="form" layout="horizontal">
      <a-spin>
        <a-row v-for="(im, ix) in columns" :key="ix" :gutter="16">
          <a-col v-for="(im2, ix2) in im" :key="ix2">
            <a-form-item :label="im2.title">
              <a-radio-group
                v-if="im2.formType == `radioGroup`"
                v-decorator="[im2.dataIndex]"
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
                v-decorator="[im2.dataIndex]"
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
                v-decorator="[im2.dataIndex]"
                :style="im2.props.style"
                :show-time="im2.props.showTime"
                format="YYYY-MM-DD HH:mm:ss"
              />

              <a-cascader
                v-else-if="im2.formType == `cascader`"
                v-decorator="[im2.dataIndex]"
                :disabled="im2.disabled ? im2.disabled : false"
                :placeholder="`请选择${
                  im2.placeholder ? im2.placeholder : im2.title
                }`"
                :fieldNames="im2.fieldNames"
                :options="im2.props.options"
                :loadData="(selectedOptions) => loadData(selectedOptions, im2)"
                changeOnSelect
                @change="onCascaderChange"
              />

              <a-input
                v-else
                v-decorator="[im2.dataIndex]"
                :placeholder="`请输入${
                  im2.placeholder ? im2.placeholder : im2.title
                }`"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-spin>
    </a-form>
  </div>
</template>
<script>
import _ from 'lodash';

import { getCityTree, getCityTreeById } from '@/api/sys/area.js';

export default {
  props: {
    props: {
      type: Object,
      default: function () {
        return {
          groupSize: 3,
          title: null,
          show: false,
          columns: [],
          record: {}
        };
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      record: {},
      advanced: true,
      columns: []
    };
  },
  created() {
    setTimeout(() => {
      this.columns = this.convertTo2DArray(this.props.columns, 3);
      console.log(' this.columns', this.columns);
    }, 100);
  },
  methods: {
    //级联选择组件.默认回显以后点击每一级不会自动加载远程数据了，所以加一个change事件，点击任何一级上级强制加载出下级
    onCascaderChange(value, selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      let targetOptionOld = _.cloneDeep(targetOption);
      let targetOptionNew = _.cloneDeep(targetOption);
      let propsTemp = _.cloneDeep(this.props);
      this.columns.forEach((im) => {
        im.forEach(async (im2) => {
          if (`upload`.indexOf(im2.formType) == -1) {
            // let formItemData = {};
            if (`cascader`.indexOf(im2.formType) != -1) {
              let lastId = value[value.length - 1];
              let all = JSON.stringify(im2.props.options);
              let targetOptionOldStr = JSON.stringify(targetOptionOld);
              let resp = await getCityTree({ pid: lastId });
              targetOptionNew.child = resp;
              let targetOptionNewStr = JSON.stringify(targetOptionNew);
              //区域级联，回显赋值，一次把当前选择的顶层id传到后台查出层级关系，因为动态加载的级联选择器默认只加载第一层数据
              all = all.replace(targetOptionOldStr, targetOptionNewStr);
              im2.props.options = JSON.parse(all);
              this.$emit('propsChange', propsTemp);
            }
          }
        });
      });
    },
    //远程加载级联组件的数据
    async loadData(selectedOptions, im) {
      console.log('loadData.');
      const targetOption = selectedOptions[selectedOptions.length - 1];
      let targetOptionOld = _.cloneDeep(targetOption);
      targetOption.loading = true;
      let ops = await im.props.url({ pid: targetOption.id });
      targetOption.loading = false;
      targetOption.child = ops;
      let propsTemp = _.cloneDeep(this.props);
      this.columns.forEach((im2) => {
        im2.forEach((im3) => {
          if (im3.dataIndex == im.dataIndex) {
            //直接转成字符串进行替换,避免用递归循环替换新的对象
            let all = JSON.stringify(im3.props.options);
            let targetOptionOldStr = JSON.stringify(targetOptionOld);
            let targetOptionNewStr = JSON.stringify(targetOption);
            all.replace(targetOptionOldStr, targetOptionNewStr);
            im3.props.options = JSON.parse(all);
          }
        });
      });
      // console.log("loadData-selectedOptions3", this.columns)
      this.$emit('propsChange', propsTemp);
    },
    //上传组件回调
    UploadSngle(fileUrl, item) {
      console.log('UploadSngle.fileUrl', fileUrl);
      console.log('UploadSngle.dataIndex', item);
      item.fileUrl = fileUrl;
    },
    filter(inputValue, path, fieldNames) {
      console.log('filter.inputValue', inputValue);
      console.log('filter.path', path);
      return path.some(
        (option) =>
          option[fieldNames.label]
            .toLowerCase()
            .indexOf(inputValue.toLowerCase()) > -1
      );
    },
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
          console.log('Received values of propsTemp: ', propsTemp);
          this.columns.forEach((im) => {
            im.forEach((im2) => {
              if (im2.formType == `upload`) {
                console.log('im.formType == `upload`', im2.fileUrl);
                values[im2.dataIndex] = im2.fileUrl;
              } else if (`Select`.indexOf(im2.formType) != -1) {
                values[im2.dataIndex] = this.record[im2.dataIndex].value;
              }
            });
          });
          this.$emit('propsChange', propsTemp);
          console.log('onSubmit', this.record);
          this.$emit('propsSubmit', {
            propsTemp,
            data: { ...this.record, ...values }
          });
          propsTemp.loading = true;

          // this.addFormProps.loading = false;
        }
      });
    },
    ok(msg) {
      let propsTemp = _.cloneDeep(this.props);
      propsTemp.loading = false;
      propsTemp.show = false;
      this.form.resetFields();
      this.columns.forEach((im) => {
        im.forEach((im2) => {
          if (`upload`.indexOf(im2.formType) != -1) {
            // let formItemData = {};
            im2.fileUrl = null;
          }
        });
      });
      this.$emit('propsChange', propsTemp);
      this.$message.success(msg);
    },
    no(msg) {
      let propsTemp = _.cloneDeep(this.props);
      propsTemp.loading = false;
      propsTemp.show = true;
      this.$emit('propsChange', propsTemp);
      if (msg) {
        this.$message.error(msg);
      }
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      let propsTemp = _.cloneDeep(this.props);
      propsTemp.show = false;
      this.$emit('propsChange', propsTemp);
    },
    async onOpen(data) {
      let propsTemp = _.cloneDeep(this.props);
      propsTemp = { ...propsTemp, ...data };
      propsTemp.groupSize = propsTemp.groupSize ? propsTemp.groupSize : 3;
      propsTemp.show = true;
      this.columns.sort((a, b) => {
        if (a.formType === 'upload' && b.formType !== 'upload') {
          return 1; // a排在b后面
        } else if (a.formType !== 'upload' && b.formType === 'upload') {
          return -1; // a排在b前面
        } else {
          return 0; // 保持原有顺序
        }
      });

      this.columns = this.columns?.filter((im) => {
        return !im.noAdd || !im.noEdit;
      });
      for (let i = 0; i < this.columns.length; i++) {
        let im = this.columns[i];
        if (
          'cascader,select,radio'.indexOf(im.formType) != -1 &&
          im.props.url
        ) {
          let ops = await im.props.url({});
          console.log('im.props.url({})', ops);
          im.props.options = ops;
        }
      }
      this.columns = this.convertTo2DArray(this.columns, propsTemp.groupSize);
      this.$emit('propsChange', propsTemp);
    },
    setFormData(data) {
      let propsTemp = _.cloneDeep(this.props);
      this.columns.forEach((im) => {
        im.forEach(async (im2) => {
          if (`upload`.indexOf(im2.formType) == -1) {
            let formItemData = {};
            if (`cascader`.indexOf(im2.formType) != -1) {
              formItemData[im2.dataIndex] = data[im2.dataIndex].split(',');
              let firstId = formItemData[im2.dataIndex][0];
              let lastId =
                formItemData[im2.dataIndex][
                  formItemData[im2.dataIndex].length - 1
                ];
              let all = null;
              let targetOptionOldStr = null;
              let targetOptionNewStr = null;
              im2.props.options.forEach((im3) => {
                if (im3.id == firstId) {
                  all = JSON.stringify(im2.props.options);
                  targetOptionOldStr = JSON.stringify(im3);
                  console.log('targetOptionOldStr', targetOptionOldStr);
                }
              });
              //区域级联，回显赋值，一次把当前选择的顶层id传到后台查出层级关系，因为动态加载的级联选择器默认只加载第一层数据
              if (all) {
                let resp = await getCityTreeById({ id: lastId });
                targetOptionNewStr = JSON.stringify(resp[0]);
                all = all.replace(targetOptionOldStr, targetOptionNewStr);
                im2.props.options = JSON.parse(all);
                this.$emit('propsChange', propsTemp);
              }
            } else if (`Select`.indexOf(im2.formType) != -1) {
              formItemData[im2.dataIndex] = data[im2.dataIndex].value;
            } else {
              formItemData[im2.dataIndex] = data[im2.dataIndex];
            }
            this.form.setFieldsValue(formItemData);
          } else {
            im2.fileUrl = data[im2.dataIndex];
          }
        });
      });
      this.record = data;
      console.log('setFormData', this.record);
      this.$emit('propsChange', propsTemp);
    },
    filterFormData() {},
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
<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block;
}

.operator {
  margin-bottom: 18px;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
