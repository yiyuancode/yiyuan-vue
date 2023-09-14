<template>
  <div>
    <a-drawer
      :title="props.title"
      :width="props.groupSize * 350"
      :visible="props.show"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical">
        <a-spin :spinning="props.loading">
          <a-row v-for="(im, ix) in props.columns" :key="ix" :gutter="16">
            <a-col
              v-for="(im2, ix2) in im"
              :key="ix2"
              :span="24 / props.groupSize"
            >
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

                <a-cascader
                  v-else-if="im2.formType == `cascader`"
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
                  :fieldNames="im2.fieldNames"
                  :options="im2.props.options"
                  :loadData="(selectedOptions)=>loadData(selectedOptions,im2)"
                  changeOnSelect
                  @change="onCascaderChange"
                />
                <!--                :show-search="{-->
                <!--                filter: (inputValue, path) => {-->
                <!--                return filter(inputValue, path, im2.fieldNames);-->
                <!--                }-->
                <!--                }"-->
                <UploadSngle
                  v-else-if="im2.formType == `upload`"
                  v-model="im2.fileUrl"
                  @UploadSngle="(fileUrl) => UploadSngle(fileUrl, im2)"
                ></UploadSngle>
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
        <a-button type="primary" :loading="props.loading" @click="onSubmit">
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
  import _ from 'lodash';

  import UploadSngle from '@/components/uploadSngle';
  import {getCityTree, getCityTreeById} from '@/api/sys/area.js'

  export default {
    components: {UploadSngle},
    props: {
      props: {
        type: Object,
        default: function () {
          return {
            search: () => {
            },
            groupSize: 1,
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
    created() {
    },
    methods: {
      //级联选择组件.默认回显以后点击每一级不会自动加载远程数据了，所以加一个change事件，点击任何一级上级强制加载出下级
      onCascaderChange(value, selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        let targetOptionOld = _.cloneDeep(targetOption);
        let targetOptionNew = _.cloneDeep(targetOption);
        let propsTemp = _.cloneDeep(this.props);
        propsTemp.columns.forEach((im) => {
          im.forEach(async (im2) => {
            if (`upload`.indexOf(im2.formType) == -1) {
              // let formItemData = {};
              if (`cascader`.indexOf(im2.formType) != -1) {
                let lastId = value[value.length - 1]
                let all = JSON.stringify(im2.props.options);
                let targetOptionOldStr = JSON.stringify(targetOptionOld);
                let resp = await getCityTree({pid: lastId});
                targetOptionNew.child = resp;
                let targetOptionNewStr = JSON.stringify(targetOptionNew);
                //区域级联，回显赋值，一次把当前选择的顶层id传到后台查出层级关系，因为动态加载的级联选择器默认只加载第一层数据
                all = all.replace(targetOptionOldStr, targetOptionNewStr)
                im2.props.options = JSON.parse(all);
                this.$emit('propsChange', propsTemp);
              }


            }
          });
        });
      },
      //远程加载级联组件的数据
      async loadData(selectedOptions, im) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        let targetOptionOld = _.cloneDeep(targetOption);
        targetOption.loading = true;
        let ops = await im.props.url({pid: targetOption.id});
        targetOption.loading = false;
        targetOption.child = ops;
        let propsTemp = _.cloneDeep(this.props);
        propsTemp.columns.forEach((im2) => {
          im2.forEach((im3) => {
            if (im3.dataIndex == im.dataIndex) {
              //直接转成字符串进行替换,避免用递归循环替换新的对象
              let all = JSON.stringify(im3.props.options);
              let targetOptionOldStr = JSON.stringify(targetOptionOld);
              let targetOptionNewStr = JSON.stringify(targetOption);
              all.replace(targetOptionOldStr, targetOptionNewStr)
              im3.props.options = JSON.parse(all);
            }
          });
        });
        // console.log("loadData-selectedOptions3", propsTemp.columns)
        this.$emit('propsChange', propsTemp);

        // targetOption.children=ops
        // im.props.options = ops;
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
            propsTemp.columns.forEach((im) => {
              im.forEach((im2) => {
                if (im2.formType == `upload`) {
                  console.log('im.formType == `upload`', im2.fileUrl);
                  values[im2.dataIndex] = im2.fileUrl;
                }
              });
            });
            this.$emit('propsChange', propsTemp);
            this.$emit('propsSubmit', values);
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
        propsTemp.columns.forEach((im) => {
          im.forEach((im2) => {
            if (im2.formType == `upload`) {
              im2.fileUrl = '';
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
        propsTemp = {...propsTemp, ...data};
        propsTemp.groupSize = propsTemp.groupSize ? propsTemp.groupSize : 1;
        propsTemp.show = true;

        propsTemp.columns.sort((a, b) => {
          if (a.formType === 'upload' && b.formType !== 'upload') {
            return 1; // a排在b后面
          } else if (a.formType !== 'upload' && b.formType === 'upload') {
            return -1; // a排在b前面
          } else {
            return 0; // 保持原有顺序
          }
        });

        propsTemp.columns = propsTemp.columns?.filter((im) => {
          return !im.noAdd || !im.noEdit;
        });
        for (let i = 0; i < propsTemp.columns.length; i++) {
          let im = propsTemp.columns[i];
          if (
            'cascader,select,radio'.indexOf(im.formType) != -1 &&
            im.props.url
          ) {
            let ops = await im.props.url({});
            console.log('im.props.url({})', ops);
            im.props.options = ops;


          }
        }
        propsTemp.columns = this.convertTo2DArray(
          propsTemp.columns,
          propsTemp.groupSize
        );
        this.$emit('propsChange', propsTemp);
      },
      setFormData(data) {
        let propsTemp = _.cloneDeep(this.props);
        console.log('setData.propsTemp', propsTemp);
        console.log('setData.data', data);
        propsTemp.columns.forEach((im) => {
          im.forEach(async (im2) => {
            if (`upload`.indexOf(im2.formType) == -1) {
              let formItemData = {};
              if (`cascader`.indexOf(im2.formType) != -1) {

                formItemData[im2.dataIndex] = data[im2.dataIndex].split(',');
                let firstId = formItemData[im2.dataIndex][0]
                let lastId = formItemData[im2.dataIndex][formItemData[im2.dataIndex].length - 1]
                let all = null;
                let targetOptionOldStr = null;
                let targetOptionNewStr = null;
                im2.props.options.forEach((im3) => {
                  if (im3.id == firstId) {
                    all = JSON.stringify(im2.props.options);
                    targetOptionOldStr = JSON.stringify(im3);
                    console.log("targetOptionOldStr", targetOptionOldStr)
                  }

                })
                //区域级联，回显赋值，一次把当前选择的顶层id传到后台查出层级关系，因为动态加载的级联选择器默认只加载第一层数据
                if (all) {
                  let resp = await getCityTreeById({id: lastId});
                  targetOptionNewStr = JSON.stringify(resp[0]);
                  all = all.replace(targetOptionOldStr, targetOptionNewStr)
                  im2.props.options = JSON.parse(all);
                  this.$emit('propsChange', propsTemp);
                }
              } else {
                formItemData[im2.dataIndex] = data[im2.dataIndex];
              }
              this.form.setFieldsValue(formItemData);

            }
          });
        });
      },
      filterFormData() {
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
