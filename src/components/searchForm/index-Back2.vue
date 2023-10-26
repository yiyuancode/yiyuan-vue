<template>
  <div :class="advanced ? 'search' : null" style="position: relative">
    <a-form :form="form" layout="horizontal">
      <div :class="advanced ? null : 'fold'">
        <template v-for="(im, ix) in columns">
          <a-row v-show="ix == 0" :key="im.dataIndex" :gutter="16">
            <a-col v-for="(im2, ix2) in im" :key="ix2" :span="24 / groupSize">
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
                <a-range-picker
                  v-else-if="im2.formType == `datePicker`"
                  v-decorator="[im2.dataIndex]"
                  allowClear
                  showTime
                  :placeholder="[`开始时间`, `结束时间`]"
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
                  :loadData="
                    (selectedOptions) => loadData(selectedOptions, im2)
                  "
                  changeOnSelect
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
          <a-row v-show="ix != 0 && advanced" :key="im.dataIndex" :gutter="16">
            <a-col v-for="(im2, ix2) in im" :key="ix2" :span="24 / groupSize">
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

                <a-range-picker
                  v-else-if="im2.formType == `datePicker`"
                  v-decorator="[im2.dataIndex]"
                  allowClear
                  showTime
                  :placeholder="[`开始时间`, `结束时间`]"
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
                  :loadData="
                    (selectedOptions) => loadData(selectedOptions, im2)
                  "
                  changeOnSelect
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
        </template>
      </div>
      <span
        :style="{
          position: 'absolute',
          right: '0',
          bottom: advanced ? '0' : '50%',
          transform: advanced ? 'translate(0,0)' : 'translate(0,50%)'
        }"
      >
        <a-button type="primary" @click="onSubmit">查询</a-button>
        <a-button style="margin-left: 8px">重置</a-button>
        <a style="margin-left: 8px" @click="toggleAdvanced">
          {{ advanced ? '收起' : '展开' }}
          <a-icon :type="advanced ? 'up' : 'down'" />
        </a>
      </span>
    </a-form>
  </div>
</template>
<script>
import _ from 'lodash';
import { getCityTree } from '@/api/sys/area.js';
import moment from 'moment';

export default {
  props: {
    props: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      record: {},
      advanced: false,
      columns: [],
      groupSize: 4
    };
  },
  created() {
    setTimeout(() => {
      this.columns = this.convertTo2DArray(this.props, this.groupSize);

      this.loadCascaderOps();
    }, 150);
  },
  methods: {
    keepZeroValue(value) {
      return value !== undefined && value !== '' && value !== null;
    },
    loadCascaderOps() {
      this.columns.forEach((im) => {
        im.forEach(async (im2) => {
          if (`cascader`.indexOf(im2.formType) != -1) {
            let resp = await getCityTree({ pid: 0 });
            im2.props.options = resp;
          }
        });
      });
    },

    //远程加载级联组件的数据
    async loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      let targetOptionOld = _.cloneDeep(targetOption);
      targetOption.loading = true;
      let ops = await getCityTree({ pid: targetOption.id });
      targetOption.loading = false;
      targetOption.child = ops;
      let columnsTemp = _.cloneDeep(this.columns);

      columnsTemp.forEach((im2) => {
        im2.forEach((im3) => {
          if (`cascader`.indexOf(im3.formType) != -1) {
            let all = JSON.stringify(im3.props.options);
            let targetOptionOldStr = JSON.stringify(targetOptionOld);
            let targetOptionNewStr = JSON.stringify(targetOption);
            all = all.replaceAll(targetOptionOldStr, targetOptionNewStr);
            im3.props.options = JSON.parse(all);
          }
        });
      });
      this.columns = columnsTemp;
      //
    },
    filter(inputValue, path, fieldNames) {
      return path.some(
        (option) =>
          option[fieldNames.label]
            .toLowerCase()
            .indexOf(inputValue.toLowerCase()) > -1
      );
    },

    onSubmit() {
      let formData = this.form.getFieldsValue();
      let formDataTemp = _.cloneDeep(formData);
      //提前移除空参数
      const params = _.pickBy({ ...formDataTemp }, this.keepZeroValue);
      for (let key in params) {
        let value = params[key];
        // 在这里对时间字段属性进行处理
        if (Array.isArray(value)) {
          if (value[value.length - 1] instanceof moment) {
            value = value.map((m) => m.format('yyyy-MM-DD HH:mm:ss"'));
            params[key + 'Start'] = value[value.length - 2];
            params[key + 'End'] = value[value.length - 1];
            delete params[key];
          }
        }
      }

      this.$emit('onSearch', params);
    },

    filterFormData() {},
    //一维数组转成二维数组
    convertTo2DArray(arr, groupSize) {
      arr = arr.filter((item) => {
        return !item.noSearch;
      });
      var result = [];
      for (var i = 0; i < arr?.length; i += groupSize) {
        result.push(arr.slice(i, i + groupSize));
      }
      return result;
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
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

/deep/ .ant-calendar-picker {
  width: 100% !important;
}
</style>
