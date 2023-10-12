<template>
  <div>
    <a-drawer
      title="Create a new account"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <template v-for="item in props.columns">
          <!--          <a-form-item required v-if="item.upload&&!item.noAdd" :label="item.title" :key="index"-->
          <!--                       :help="item.upload.errorMsg" :validate-status="item.upload.validateStatus">-->

          <!--            <UploadSngle v-model="props.record[item.dataIndex]"-->
          <!--                         @UploadSngle="(fileUrl)=>UploadSngle(fileUrl,item.dataIndex)"></UploadSngle>-->

          <!--          </a-form-item>-->
          <a-form-item v-if="!item.upload && !item.noAdd" :label="item.title">
            <a-radio-group
              :disabled="item.disabled ? item.disabled : false"
              :placeholder="item.title"
              v-if="item.radio"
              v-decorator="[
                item.dataIndex,
                { rules: [{ required: true, message: item.title }] }
              ]"
            >
              <a-radio-button :value="im.value" v-for="im in item.radio.option">
                {{ im.name }}
              </a-radio-button>
            </a-radio-group>

            <a-select
              :disabled="item.disabled ? item.disabled : false"
              v-else-if="item.select && !item.select.search"
              allowClear
              show-search
              :placeholder="item.title"
              option-filter-prop="children"
              v-decorator="[
                item.dataIndex,
                { rules: [{ required: true, message: item.title }] }
              ]"
            >
              <a-select-option
                :value="im.value"
                v-for="im in item.select.option"
              >
                {{ im.name }}
              </a-select-option>
            </a-select>

            <a-select
              :disabled="item.disabled ? item.disabled : false"
              v-else-if="item.select && item.select.search"
              allowClear
              :placeholder="item.title"
              show-search
              :value="value"
              :default-active-first-option="false"
              :filter-option="false"
              v-decorator="[
                item.dataIndex,
                { rules: [{ required: true, message: item.title }] }
              ]"
              @search="(val) => handleSearchSelect(val, item.dataIndex, item)"
              @change="
                (val, option) =>
                  handleChangeSelect(val, item.dataIndex, item, option)
              "
            >
              <!-- 	<a-icon slot="suffixIcon" type="search" /> -->
              <a-select-option
                :value="im.value"
                v-for="im in item.select.option"
              >
                {{ im.name }}
              </a-select-option>
            </a-select>

            <a-date-picker
              v-else-if="item.time"
              v-decorator="[
                item.dataIndex,
                {
                  rules: [{ required: true, message: item.title }]
                }
              ]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
            />

            <a-input
              :disabled="item.disabled ? item.disabled : false"
              :placeholder="item.title"
              v-else
              v-decorator="[
                item.dataIndex,
                { rules: [{ required: true, message: item.title }] }
              ]"
              allowClear
            />
          </a-form-item>
        </template>
      </a-form>
    </a-drawer>
    <!--		<a-modal :title="props.title" :visible="true" :confirm-loading="confirmLoading" @ok="handleOk"-->
    <!--			@cancel="handleCancel">-->

    <!--		</a-modal>-->
  </div>
</template>
<script>
import _ from 'lodash';
import UploadSngle from '@/components/UploadSngle';

export default {
  name: 'AddForm',
  components: {
    UploadSngle
  },
  props: {
    props: {
      type: Object,
      default: function () {
        return {
          title: null,
          //1=新增  2=修改
          type: null,
          show: false,
          columns: columns,
          record: {}
        };
      }
    }
  },

  created() {
    let vm = this;
    this.$nextTick(() => {


      //动态加载下拉框的枚举值
      let propsTmep = _.cloneDeep(vm.props);


      propsTmep.columns.forEach(async (im, ix) => {
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
          //
          //
          vm.$emit('propsChange', propsTmep);
        }
      });

      //区分修改还是填写
      if (propsTmep.type == 2) {

        let record = {};
        propsTmep.columns.forEach((im, ix) => {
          if (!im.noAdd && !im.upload) {
            record[im.dataIndex] = propsTmep.record[im.dataIndex];
          }
        });


        vm.form.setFieldsValue(record);

        vm.$emit('propsChange', propsTmep);
        // vm.form.setFieldsValue(newName.formParm)
      } else {

        vm.form.resetFields();
        propsTmep.columns.forEach((im, ix) => {
          if (im.upload) {

            propsTmep.record[im.dataIndex] = null;
          }
        });

        if (Object.keys(propsTmep.record).length != 0) {
          setTimeout(() => {
            vm.form.setFieldsValue(propsTmep.record);

              'propsTmep.record.vm.form.getFieldsValue()',
              vm.form.getFieldsValue()
            );
          }, 100);
        }

        vm.$emit('propsChange', propsTmep);
      }
    });
  },
  data() {
    return {
      ModalText: 'Content of the modal',
      confirmLoading: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {
        name: 'coordinated'
      }),
      open: false
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {

      let vm = this;
      let propsTmep = _.cloneDeep(vm.props);

      //校验所有非表单组件
      let notFormErr = false;
      propsTmep.columns.forEach((im, ix) => {
        if (im.upload) {
          if (!propsTmep.record[im.dataIndex]) {
            im.upload.validateStatus = 'error';
            im.upload.errorMsg = im.title;
            notFormErr = true;
          }
        }
      });

      //校验所有表单组件
      vm.form.validateFields((err) => {
        if (!err) {
          let formData = vm.form.getFieldsValue();


          if (!notFormErr) {
            propsTmep.show = false;
            propsTmep.isSubMit = true;
          }
          propsTmep.record = {
            ...propsTmep.record,
            ...formData
          };


          vm.$emit('propsChange', propsTmep);
        } else {
          vm.$emit('propsChange', propsTmep);
        }
      });
    },
    handleCancel(e) {

      let vm = this;
      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.show = false;
      vm.$emit('propsChange', propsTmep);
    },

    UploadSngle(fileUrl, dataIndex) {
      let vm = this;
      let propsTmep = _.cloneDeep(vm.props);

      propsTmep.record[dataIndex] = fileUrl;
      propsTmep.columns.forEach((im, ix) => {
        if (im.upload) {
          if (propsTmep.record[dataIndex]) {
            im.upload.validateStatus = 'success';
            im.upload.errorMsg = null;
          }
        }
      });
      vm.$emit('propsChange', propsTmep);
    },

    handleSearchSelect(value, dataIndex, item) {

      // if(!value){
      // 	return
      // }
      let vm = this;
      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.columns.forEach(async (im, ix) => {
        if (im.dataIndex == dataIndex) {
          im.select.option = await vm[im.select.method]({
            name: value
          });

        }
      });
      //
      vm.$emit('propsChange', propsTmep);

      // fetch(value, data => (this.data = data));
    },
    handleChangeSelect(value, dataIndex, item, option) {


      let vm = this;
      let propsTmep = _.cloneDeep(vm.props);
      propsTmep.record[dataIndex] = value;
      let selectOptionList = item.select.option;
      selectOptionList.forEach((item2, index2) => {
        if (item2[dataIndex] == value) {
          propsTmep.record['row'] = item2;
        }
      });

      // if(item.otherDataIndex){
      // 	let selectOptionList= item.select.option
      //
      // 	let selectOptionListItem= {}
      // 	selectOptionList.forEach((item2,index2)=>{
      // 		if(item2[dataIndex]==value){
      // 			selectOptionListItem=item2;
      // 		}
      // 	})
      //
      // 	propsTmep.record[item.otherDataIndex] = selectOptionListItem;
      // }
      vm.$emit('propsChange', propsTmep);
      // this.value = value;
      // fetch(value, data => (this.data = data));
    }
  }
};
</script>
