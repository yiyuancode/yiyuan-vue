<template>
  <a-card style="width: 100%">
    <a-form-model ref="form" class="ant-advanced-search-form" :model="form">
      <a-row :gutter="10">
        <a-col
          v-for="(item, index) in uColumns"
          :key="item.dataIndex"
          :span="span"
          :style="{ display: index < count ? 'block' : 'none' }"
        >
          <template v-if="item.dataIndex">
            <a-form-model-item :label="`${item.title}`">
              <a-range-picker
                v-if="item.formType == `datePicker`"
                v-model="form[item.dataIndex]"
                allowClear
                showTime
                :placeholder="[`开始时间`, `结束时间`]"
              />

              <a-select
                v-else-if="item.formType == `radioGroup`"
                v-model="form[item.dataIndex]"
                allowClear
                :placeholder="`请选择${
                  item.placeholder ? item.placeholder : item.title
                }`"
                :default-active-first-option="false"
                :filter-option="false"
              >
                <a-select-option
                  v-for="(im3, ix3) in item.props.options"
                  :key="ix3"
                  :value="im3.value"
                >
                  {{ im3.label }}
                </a-select-option>
              </a-select>

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
        <!--        <a-col-->
        <!--          v-for="index in scopedSlots"-->
        <!--          :key="index"-->
        <!--          :span="span"-->
        <!--          :style="{-->
        <!--            display:-->
        <!--              expand || (uColumns.length == 0 && scopedSlots > 0)||index < count-->
        <!--                ? 'block'-->
        <!--                : 'none'-->
        <!--          }"-->
        <!--        >-->
        <!--          <slot :name="`scopedSlots-${index}`" v-bind="{ form }"></slot>-->
        <!--        </a-col>-->
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            @click="searchClick"
          >
            查询
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            {{ expand ? '收起' : '展开' }}
            <a-icon :type="expand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form-model>
  </a-card>
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
    }
  },
  data() {
    return {
      form: {},
      expand: false,
      span: 6
    };
  },
  computed: {
    uColumns() {
      let columnsTemp = this.columns.filter((item) => {
        return !item.noSearch;
      });
      columnsTemp = columnsTemp.filter((item) => {
        return !this.scopedSlots.includes(item.dataIndex);
      });
      columnsTemp = [...this.scopedSlots, ...columnsTemp];
      return columnsTemp;
    },
    count() {
      return this.expand ? this.uColumns.length : 4;
    }
  },
  created() {
    // setTimeout(() => {
    //   this.columns = this.convertTo2DArray(this.props, this.groupSize);
    //   this.loadCascaderOps();
    // }, 150);
  },
  methods: {
    searchClick() {
      console.log('this.form', this.form);
      let formTemp = _.cloneDeep(this.form);
      this.uColumns.forEach((item) => {
        if (item.formType == 'datePicker' && formTemp[item.dataIndex]) {
          console.log('let formTemp ', formTemp);
          formTemp[item.dataIndex + 'Start'] = this.form[
            item.dataIndex
          ][0].format('YYYY-MM-DD HH:mm:ss');
          formTemp[item.dataIndex + 'End'] = this.form[
            item.dataIndex
          ][1].format('YYYY-MM-DD HH:mm:ss');
          delete formTemp[item.dataIndex];
        }
      });

      console.log(formTemp);
      this.$emit('search', formTemp);
    },

    handleReset() {
      // this.$refs.form.resetFields();
      this.form = {};
      console.log('this.form', this.form);
      this.$emit('search', this.form);
    },

    toggle() {
      this.expand = !this.expand;
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
