<template>
  <div :class="props.advanced ? 'search' : null">
    <PageView v-if="!props.noPageView"></PageView>
    <a-form layout="horizontal" :form="form">
      <div :class="props.advanced ? null : 'fold'">
        <template v-for="(im, ix) in arr">
          <template v-if="ix == 0">
            <a-row>
              <a-col :md="8" :sm="24" v-for="(im2, ix2) in im" :key="ix2">
                <a-form-item
                  :label="im2.title"
                  :labelCol="{ span: 4 }"
                  :wrapperCol="{ span: 14, offset: 1 }"
                >
                  <!-- <a-input :placeholder="im2.title" v-decorator="[`pyName`]" allowClear /> -->

                  <a-select
                    allowClear
                    v-if="im2.radio"
                    show-search
                    :placeholder="im2.title"
                    option-filter-prop="children"
                    v-decorator="[im2.dataIndex]"
                    @change="(e) => selectChange(e, im2.dataIndex)"
                  >
                    <a-select-option
                      :value="im3.value"
                      v-for="(im3, ix3) in im2.radio.option"
                      :key="ix3"
                    >
                      {{ im3.name }}
                    </a-select-option>
                  </a-select>

                  <a-select
                    allowClear
                    v-else-if="im2.select"
                    show-search
                    :placeholder="im2.title"
                    option-filter-prop="children"
                    v-decorator="[im2.dataIndex]"
                    @change="(e) => selectChange(e, im2.dataIndex)"
                  >
                    <a-select-option
                      :value="im3.value"
                      v-for="(im3, ix3) in im2.select.option"
                      :key="ix3"
                    >
                      {{ im3.name }}
                    </a-select-option>
                  </a-select>
                  <a-range-picker
                    v-else-if="im2.time && im2.time.defaultValue"
                    :showTime="im2.time.showTime"
                    allowClear
                    v-decorator="[im2.dataIndex]"
                    :disabled-date="
                      (current) => {
                        return current < $mt(im2.time.defaultValue[0]);
                      }
                    "
                    :default-value="im2.time.defaultValue"
                    :defaultPickerValue="im2.time.defaultValue"
                  />
                  <a-range-picker
                    v-else-if="im2.time && !im2.time.defaultValue"
                    allowClear
                    v-decorator="[im2.dataIndex]"
                    :showTime="im2.time.showTime"
                  />
                  <!-- <a-range-picker :mode="['month','month']" v-else-if="im2.timeM" allowClear
                          v-decorator="[im2.dataIndex]" @panelChange="monthPickerChange" :open="monthPickerShow" @openChange="monthPickerOpenChange"  @change="monthPickerOpenChange" />
                          <template slot="renderExtraFooter">
                                  extra footer22222
                                </template>
                          </a-range-picker> -->

                  <template v-else-if="im2.timeM">
                    <!-- <a-month-picker placeholder="Select month" >
                                  <template slot="renderExtraFooter">
                                    extra footer
                                  </template>
                                </a-month-picker>
                                <a-month-picker placeholder="Select month"  >
                                      <template slot="renderExtraFooter">
                                        extra footer
                                      </template>
                                    </a-month-picker> -->

                    <a-range-picker
                      :placeholder="['开始月份', '结束月份']"
                      format="YYYY-MM"
                      v-decorator="[im2.dataIndex]"
                      :mode="['month', 'month']"
                      :open="monthPickerShow"
                      :value="form.getFieldsValue()[im2.dataIndex]"
                      @openChange="monthPickerOpenChange"
                      @panelChange="
                        (e) => monthPickerPanelChange(e, im2.dataIndex)
                      "
                    >
                      <template slot="renderExtraFooter">
                        <a @click="monthPickerChange(im2.dataIndex)">确定</a>
                      </template>
                    </a-range-picker>
                  </template>

                  <a-input
                    :placeholder="im2.title"
                    v-if="!im2.time && !im2.radio && !im2.select && !im2.timeM"
                    v-decorator="[im2.dataIndex]"
                    allowClear
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </template>
          <template v-if="ix > 0">
            <a-row v-if="props.advanced">
              <a-col :md="8" :sm="24" v-for="(im2, ix2) in im" :key="ix2">
                <a-form-item
                  :label="im2.title"
                  :labelCol="{ span: 4 }"
                  :wrapperCol="{ span: 14, offset: 1 }"
                >
                  <!-- <a-input :placeholder="im2.title" v-decorator="[`pyName`]" allowClear /> -->

                  <a-select
                    allowClear
                    v-if="im2.radio"
                    show-search
                    :placeholder="im2.title"
                    option-filter-prop="children"
                    v-decorator="[im2.dataIndex]"
                    @change="(e) => selectChange(e, im2.dataIndex)"
                  >
                    <a-select-option
                      :value="im3.value"
                      v-for="(im3, ix3) in im2.radio.option"
                      :key="ix3"
                    >
                      {{ im3.name }}
                    </a-select-option>
                  </a-select>

                  <a-select
                    allowClear
                    v-else-if="im2.select"
                    show-search
                    :placeholder="im2.title"
                    option-filter-prop="children"
                    v-decorator="[im2.dataIndex]"
                    @change="(e) => selectChange(e, im2.dataIndex)"
                  >
                    <a-select-option
                      :value="im3.value"
                      v-for="(im3, ix3) in im2.select.option"
                      :key="ix3"
                    >
                      {{ im3.name }}
                    </a-select-option>
                  </a-select>
                  <a-range-picker
                    allowClear
                    v-else-if="im2.time"
                    allowClear
                    v-decorator="[im2.dataIndex]"
                    :showTime="im2.time.showTime"
                  />
                  <a-range-picker
                    :mode="['month', 'month']"
                    v-else-if="im2.timeM"
                    :showTime="im2.time.showTime"
                    allowClear
                    v-decorator="[im2.dataIndex]"
                    @ok="monthPickerChange"
                  />
                  <a-input
                    :placeholder="im2.title"
                    v-if="!im2.time && !im2.radio && !im2.select && !im2.timeM"
                    v-decorator="[im2.dataIndex]"
                    allowClear
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </template>
        </template>
      </div>
      <span style="float: right; margin-top: 3px">
        <a-button type="primary" @click="onSubmit">查询</a-button>
        <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
        <a @click="toggleAdvanced" style="margin-left: 8px">
          {{ props.advanced ? '收起' : '展开' }}
          <a-icon :type="props.advanced ? 'up' : 'down'" />
        </a>
      </span>
    </a-form>

    <a-table
      rowKey="id"
      :columns="table.columns"
      :data-source="table.dataSource"
      @change="tableOnPageChange"
      :pagination="table.pagination"
      :scroll="{ x: 900 }"
      :loading="table.loading"
    >
      <!--插槽上面直接用v-if判断有没有scopedSlots属性是不生效的，但是外面嵌套templete或者div循环又不行，必须a-talbe的插槽必须由他自己直接嵌套-->
      <div
        v-for="(citem, cindex) in table.columns"
        :slot="citem.scopedSlots?.customRender"
        slot-scope="text, record"
      >
        <slot :name="`table-` + citem.scopedSlots?.customRender" v-bind="record"
          >>
        </slot>
      </div>
      <!---->

      <div
        v-for="(citem, cindex) in table.columns"
        :slot="citem.scopedSlots?.customRender"
        slot-scope="text, record"
      >
        <slot :name="`table-` + citem.scopedSlots?.customRender" v-bind="record"
          >>
        </slot>
      </div>
    </a-table>
  </div>
</template>
<script>
import PageView from '@/layouts/PageView';
import _ from 'lodash';

export default {
  name: 'SearchForm',
  components: {
    PageView
  },

  props: {
    props: {
      type: Object,
      default: function () {
        return {
          columns: [],
          query: {},
          numberList: [],
          advanced: false,
          show: false,
          noPageView: false
        };
      }
    },
    table: {
      type: Object,
      default: function () {
        return {
          // columns: columns,
          // dataSource: [],
          // selectedRows: [],
          // pagination: {
          //     current: 1,
          //     pageSize: 10,
          //     total: 0,
          //     defaultPageSize: 10,
          //     showSizeChanger: true,
          //     pageSizeOptions: ['10', '20', '50', '100']
          // },
          // loading: false
        };
      }
    }
  },
  data() {
    return {
      arr: [],
      form: this.$form.createForm(this),
      monthPickerShow: false
    };
  },
  created() {
    let vm = this;
    this.$nextTick(() => {
      console.log('created组件');
      this.arr = [];
      console.log('vm.props.form', vm.props);
      //动态加载下拉框的枚举值
      let propsTmep = _.cloneDeep(vm.props);
      console.log('propsTmep.query', propsTmep.query);

      let arrTemp = [];
      propsTmep.columns.forEach(async (im, ix) => {
        if (!im.noFind) {
          arrTemp.push(im);
        }

        if (im.select && im.select.local) {
          im.select.option = im.select.option;
          vm.$emit('propsChange', propsTmep);
        }

        if (im.select && im.select.methods && !im.select.remoteUrl) {
          im.select.option = await vm[im.select.methods.name](
            im.select.methods.parm
          );
          vm.$emit('propsChange', propsTmep);
        }
        if (im.select && im.select.remoteUrl && !im.select.methods) {
          //vm[arguments[0]](arguments[1])
          // im.select.option=await vm[im.select.remoteUrl]()
          im.select.option = await vm[im.select.remoteUrl]();
          // console.log("enums",vm.$store.getters['enums/'+im.select.remoteUrl])
          //console.log("$getLg("pmsProductTypeAllOp")"+vm.$store.getters['enums/'+im.select.remoteUrl])
          vm.$emit('propsChange', propsTmep);
        }
        // if (im.select && !im.select.local && !im.select.remoteUrl) {
        // 	console.log("im.select", im.select)
        // 	im.select.option = vm.getDictOps(im.dataIndex);
        // 	console.log("enums", im.select.option)

        // 	vm.$emit("propsChange", propsTmep)
        // }
      });

      // var arr= [];
      for (var i = 0; i < arrTemp.length; i += 3) {
        this.arr.push(arrTemp.slice(i, i + 3));
      }

      if (Object.keys(propsTmep.query).length != 0) {
        console.log('propsTmep.query2222222', propsTmep.query);

        setTimeout(() => {
          vm.form.setFieldsValue(propsTmep.query);
          console.log(
            'getData.getData.getData.query.searchFormPropsChange222',
            vm.form.getFieldsValue()
          );
          propsTmep.query = vm.form.getFieldsValue();
          vm.$emit('propsChange', propsTmep);
        }, 100);
      }
      console.log('arr', this.arr);
    });
  },

  methods: {
    selectChange(e, dataIndex) {
      console.log('selectChange.e', e);
      console.log('monthPickerPanelChange.dataIndex', dataIndex);
      let vm = this;
      let item = {};
      item[dataIndex] = e;
      vm.form.setFieldsValue(item);

      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.isSubMit = false;
      propsTmep.query = {
        ...propsTmep.query,
        ...this.form.getFieldsValue()
      };
      let keyArray = Object.keys(propsTmep.query);
      console.log('propsTmep.query', propsTmep.query);
      keyArray.forEach((item, index) => {
        if (
          propsTmep.query[item] == '' ||
          propsTmep.query[item] == null ||
          propsTmep.query[item] + '' == 'undefined' ||
          propsTmep.query[item].length == 0
        ) {
          console.log('propsTmep.query', propsTmep.query[item] == 0);
          console.log('propsTmep.query', propsTmep.query[item] == null);
          console.log(
            'propsTmep.query',
            propsTmep.query[item] + '' == 'undefined'
          );
          console.log('propsTmep.query', propsTmep.query[item].length == 0);
          console.log('propsTmep.query', propsTmep.query[item] != 0);

          if (propsTmep.query[item] != 0) {
            delete propsTmep.query[item];
          }
        }
      });
      vm.$emit('propsChange', propsTmep);
    },
    monthPickerOpenChange() {
      let vm = this;
      vm.monthPickerShow = !vm.monthPickerShow;
    },
    monthPickerPanelChange(e, dataIndex) {
      console.log('monthPickerPanelChange.e', e);
      console.log('monthPickerPanelChange.dataIndex', dataIndex);
      let vm = this;
      let item = {};
      item[dataIndex] = e;
      vm.form.setFieldsValue(item);

      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.isSubMit = false;
      propsTmep.query = {
        ...propsTmep.query,
        ...this.form.getFieldsValue()
      };
      let keyArray = Object.keys(propsTmep.query);
      keyArray.forEach((item, index) => {
        if (!propsTmep.query[item] || propsTmep.query[item].length == 0) {
          delete propsTmep.query[item];
        }
      });
      vm.$emit('propsChange', propsTmep);
    },
    monthPickerChange(dataIndex) {
      console.log('monthPickerChange.e', dataIndex);
      let vm = this;
      vm.monthPickerShow = false;
      // let item={}
      // item[dataIndex]=[vm.$mt(),vm.$mt()]
      //  vm.form.setFieldsValue(item)
    },
    onSubmit() {
      let vm = this;
      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.isSubMit = true;
      propsTmep.query = {
        ...propsTmep.query,
        ...this.form.getFieldsValue()
      };
      let keyArray = Object.keys(propsTmep.query);
      keyArray.forEach((item, index) => {
        if (!propsTmep.query[item] || propsTmep.query[item].length == 0) {
          delete propsTmep.query[item];
        }
      });
      vm.$emit('propsChange', propsTmep);
    },
    resetForm() {
      let vm = this;
      vm.form.resetFields();
      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.query = {
        ...propsTmep.query,
        ...this.form.getFieldsValue()
      };
      propsTmep.query.pageSize = 10;
      propsTmep.query.current = 1;
      vm.$emit('propsChange', propsTmep);
    },
    toggleAdvanced() {
      let vm = this;
      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.advanced = !propsTmep.advanced;
      (propsTmep.isSubMit = false), vm.$emit('propsChange', propsTmep);
    },
    initForm(data) {
      let vm = this;
      let dataTmep = _.cloneDeep(data);
      let propsTmep = _.cloneDeep(vm.props);
      vm.form.setFieldsValue(dataTmep);
      propsTmep.isSubMit = true;
      propsTmep.query = {
        ...dataTmep
      };
      console.log('initForm.propsTmep', propsTmep);
      vm.$emit('propsChange', propsTmep);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .ant-card-body {
  padding-top: 0px !important;
}

/deep/ .page-header {
  padding-bottom: 15px !important;
  padding-left: 30px !important;
  padding-top: 0px !important;
}

/deep/ .page-content {
  padding: 0px !important;
}

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

.images-box {
  width: 75px;
  height: 75px;
  object-fit: cover;
}
</style>
