<template>
  <div class="manage-container">
    <!-- 管理容器 -->
    <!-- 查询操作容器 -->
    <div class="search-container">
      <searchForm :searchFormList="columnsObj.searchFormList" v-on="$listeners">
      </searchForm>
    </div>

    <!-- 主体内容区域  -->
    <div class="content-container">
      <div class="operate-btn-container">
        <!-- 添加 -->
        <a-button
          v-if="uRenderObj.addBtn.isOpen"
          type="primary"
          @click="addHandle"
        >
          {{ uRenderObj.addBtn.text }}
        </a-button>

        <!-- 导入 -->
        <a-button
          v-if="uRenderObj.importBtn.isOpen"
          type="primary"
          @click="importHandle"
        >
          {{ uRenderObj.importBtn.text }}
        </a-button>

        <!-- 导出 -->
        <a-button
          v-if="uRenderObj.exportBtn.isOpen"
          type="primary"
          @click="exportHandle"
        >
          {{ uRenderObj.exportBtn.text }}
        </a-button>

        <a-popconfirm
          title="是否要批量删除这些信息?"
          ok-text="确认"
          cancel-text="取消"
          @confirm="batchDeleteHandle"
        >
          <a-button v-if="uRenderObj.batchDeleteBtn.isOpen" type="primary">
            {{ uRenderObj.batchDeleteBtn.text }}
          </a-button>
        </a-popconfirm>
        <!-- 批量删除 -->

        <!-- 代表的是全局的一个操作，和添加并列 -->
        <slot name="otherOperationsGOContainer"></slot>
      </div>

      <!-- 列表容器 -->
      <div ref="listContainer" class="list-container">
        <a-table
          style="margin-bottom: 10px"
          class="manage-table"
          :columns="columnsObj.uTheadData"
          :data-source="data"
          :pagination="pagination"
          :loading="uRenderObj.isLoading"
          :rowKey="
            (record, index) => {
              return index;
            }
          "
          :row-selection="rowSelection"
          :scroll="{ x: scrollX, y: scrollY }"
          @change="tableChangeHandle"
        >
          <!-- 进行一个自定义插槽的遍历 -->

          <template
            v-for="item in columnsObj.tdColumnData"
            :slot="item.scopedSlots?.customRender"
            slot-scope="text, record"
          >
            <!-- {{ record }} -->
            <slot
              :name="'table-' + item.scopedSlots?.customRender"
              v-bind="{ text, record }"
            ></slot>
          </template>

          <span slot="action" slot-scope="text, record">
            <div
              v-if="uRenderObj.operateMode === 1"
              class="operate-btn-container"
            >
              <a-button
                v-if="uRenderObj.editBtn.isOpen"
                type="primary"
                style="margin-right: 5px"
                @click="editHandle(record.id)"
                >{{ uRenderObj.editBtn.text }}</a-button
              >

              <!-- 删除 -->
              <a-popconfirm
                title="是否要删除这条信息?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="confirmDeleteHandle(record.id)"
              >
                <a-button
                  v-if="uRenderObj.deleteBtn.isOpen"
                  type="primary"
                  style="margin-right: 5px"
                  >删除</a-button
                >
              </a-popconfirm>

              <!-- 针对单个其他操作容器的添加 -->
              <template
                v-for="(otherOp, index) in uRenderObj.otherOperationList"
              >
                <a-button
                  v-if="!otherOp.isPop && uRenderObj?.[otherOp.btnName]?.isOpen"
                  :key="index"
                  type="primary"
                  @click="callMethod(otherOp.methodName, record)"
                >
                  {{ otherOp.name }}
                </a-button>
              </template>

              <!-- <slot
                name="otherOperationsContainer"
                v-bind="{ text, record }"
              ></slot> -->
            </div>
          </span>
        </a-table>
      </div>
    </div>

    <slot></slot>

    <Modal
      :modalWidth="submitModalObj.modalWidth"
      :modalTitle="submitModalTitle"
      :modalVisible="modalVisble"
      :submitLoading="submitLoading"
      @onSubmit="submitHandle"
      @onCloseModal="modalVisble = false"
      @onReset="resetHandle"
    >
      <submitModalForm
        ref="submitModalForm"
        :formRef="formRef"
        :model="model"
        :rules="rules"
        :submitFormList="submitFormList"
        :labelCol="submitModalObj.labelCol"
        :wrapperCol="submitModalObj.wrapperCol"
      />
    </Modal>
  </div>
</template>

<script>
import eventBus from '@/eventBus';
import Modal from '@/components/modal/Modal';
import submitModalForm from './submitModalForm';
import searchForm from '@/components/search/searchForm';
// 默认的渲染对象配置
const defaultRenderobj = {
  addBtn: {
    isOpen: true,
    text: '添加'
  },
  editBtn: {
    isOpen: true,
    text: '编辑'
  },
  deleteBtn: {
    isOpen: true,
    text: '删除'
  },
  importBtn: {
    isOpen: true,
    text: '导入'
  },
  exportBtn: {
    isOpen: true,
    text: '导出'
  },
  batchDeleteBtn: {
    isOpen: true,
    text: '批量删除'
  },
  operateMode: 1, // 操作按钮的显示模式，可以做几种显示模式，目前两种，一种是直接按钮铺开，一种是按钮组，下拉菜单(1表示按钮铺开，2表示按钮组下拉菜单)
  loading: false, //加载
  isOpenSelectCheckbox: true,
  idProp: 'id', //需要批量操作使用的data的id属性值
  submitLoading: false //表单提交按钮loading
};
/**
 * 管理页面的插件
 */
export default {
  components: {
    Modal,
    searchForm,
    submitModalForm
  },
  props: {
    renderObj: {
      type: Object,
      default: () => {
        return defaultRenderobj;
      }
    },
    //表头数据数组
    columns: {
      type: Array,
      required: true
    },
    // 分页相关数据
    pagination: {
      type: Object,
      default: () => ({
        pageSize: 10,
        current: 1,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`
      })
    },
    // 表格数据
    data: {
      type: Array,
      required: true
    },
    submitModalObj: {
      type: Object,
      default: () => {
        return {
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          modalWidth: 450
        };
      }
    }
  },

  data() {
    return {
      modalVisble: false,
      submitOpType: '', //提交的操作类型
      submitModalTitle: '',
      submitLoading: false,
      currentId: null,
      selectedRows: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      isLoading: true,
      formRef: 'submitForm',
      rules: {},
      model: {},
      submitFormList: [],
      scrollX: 0,
      scrollY: 0
    };
  },

  computed: {
    // 渲染对象和默认渲染对象进行一个混合
    uRenderObj() {
      const uRenderObj = {
        ...defaultRenderobj,
        ...this.renderObj
      };
      return uRenderObj;
    },

    // 表头进行处理，增加操作
    columnsObj() {
      const vm = this;
      /**
       * 通过columns 拿到添加表单的列表，编辑表单的类别，以及后端传过来的对象需要.desc的值处理，uTheadData处理,td插槽数据处理，查询表单处理
       */
      const addFormList = [],
        editFormList = [],
        objColumnsArr = [],
        uTheadData = [],
        tdColumnData = [],
        searchFormList = [];
      for (let i = 0; i < this.columns.length; i++) {
        const column = this.columns[i];
        const {
          noAdd,
          noEdit,
          noShow,
          noSearch,
          key,
          title,
          props,
          formType,
          formSort,
          defaultValue,
          valType,
          scopedSlots,
          options
        } = column;

        let searchObj = column.searchObj;

        if (options) {
          if (props && !props.options) {
            props.options = options;
          }

          const formTypeArr = ['select', 'cascader'];
          if (
            !searchObj ||
            (typeof searchObj === 'object' && !searchObj.formType)
          ) {
            if (!searchObj) {
              searchObj = {};
            }
            searchObj.formType = formType;
          }

          if (
            typeof searchObj === 'object' &&
            formTypeArr.includes(searchObj.formType) &&
            !searchObj.options
          ) {
            searchObj.options = options;
          }
        }

        let rules = column.rules;
        if (typeof rules === 'function') {
          rules = rules.call(vm);
        }

        const formObj = {
          label: title,
          prop: key,
          rules,
          formType: formType ? formType : 'input',
          props,
          formSort: formSort ? formSort : 0
        };

        // 添加的表单列表
        if (!noAdd) {
          formObj.defaultValue = defaultValue;
          addFormList.push(formObj);
        }

        // 编辑的表单列表
        if (!noEdit) {
          editFormList.push(formObj);
        }

        //一些key需要处理
        if (valType && valType === 'object') {
          objColumnsArr.push(key);
        }

        // 所有显示的列表
        if (!noShow) {
          const uTheadObj = {
            ...column,
            listSort: column.listSort || 0
          };
          uTheadData.push(uTheadObj);

          // 插槽的列表
          if (scopedSlots && scopedSlots?.customRender !== 'action') {
            tdColumnData.push(uTheadObj);
          }
        }

        // 搜索列表
        if (!noSearch) {
          const searchFormObj = {
            key,
            title,
            isSearch: !noSearch
          };

          if (searchObj) {
            for (let prop in searchObj) {
              searchFormObj[prop] = searchObj[prop];
            }
          }
          searchFormList.push(searchFormObj);
        }
      }

      const otherOperationList = this.uRenderObj.otherOperationList || [];
      let isHaveOperation = false; //是否需要操作,默认否
      const defaultRowPropArr = [
        'editBtn',
        'deleteBtn',
        ...otherOperationList.map((op) => op.btnName)
      ];
      for (let prop in this.uRenderObj) {
        // 代表是按钮
        if (defaultRowPropArr.includes(prop) && this.uRenderObj[prop].isOpen) {
          isHaveOperation = true;
          break;
        }
      }

      if (isHaveOperation) {
        uTheadData.push({
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right'
        });
      }

      addFormList.sort((ad1, ad2) => {
        return ad1.formSort - ad2.formSort;
      });

      editFormList.sort((ed1, ed2) => {
        return ed1.formSort - ed2.formSort;
      });

      return {
        objColumnsArr,
        addFormList,
        editFormList,
        uTheadData,
        tdColumnData,
        searchFormList
      };
    },
    // 表格复选框的一个显示配置
    rowSelection() {
      const defaultRowSelection = {
        onSelect: (record, selected, selectedRows) => {
          this.selectedRows = selectedRows;
        },
        onSelectAll: (selected, selectedRows) => {
          this.selectedRows = selectedRows;
        }
      };
      if (this.uRenderObj.isOpenSelectCheckbox) {
        return defaultRowSelection;
      } else {
        return null;
      }
    }
  },

  created() {
    // 将columns里面带isSearch进行一个处理，处理成searchForm需要的数据
    eventBus.$emit('getObjColumn', this.columnsObj.objColumnsArr);
    window.addEventListener('resize', () => {
      this.setScrollPosition();
    });
  },
  mounted() {
    this.setScrollPosition();
  },
  methods: {
    // 调用方法
    callMethod(methodName, ...args) {
      this.$emit('onOtherEventChange', methodName, ...args);
    },
    // 设置
    setScrollPosition() {
      this.scrollX = this.$refs.listContainer.clientWidth;
      this.scrollY = this.$refs.listContainer.clientHeight - 120;
    },
    // table的change变化
    tableChangeHandle(pagination) {
      this.$emit('onChange', pagination);
    },
    // 显示添加模态框的处理
    async addHandle() {
      this.modalVisble = true;
      this.submitOpType = 'add';
      this.submitModalTitle = '添加';

      this.getSubmitFormList();
      this.$emit('onSave');
      this.$nextTick(() => {
        this.$refs.submitModalForm.$refs[this.formRef].resetFields();
      });
    },

    importHandle() {
      this.noDeveloped();
    },
    exportHandle() {
      this.noDeveloped();
    },
    // 批量删除
    async batchDeleteHandle() {
      const idProp = this.uRenderObj.idProp;
      const ids = this.selectedRows
        .map((selRow) => {
          return selRow[idProp];
        })
        .join(',');
      // 判断当前是否选择了
      if (!ids) {
        this.$message.error('请至少选择一项');
        return;
      }

      this.$emit('onDelete', 'batchdelete', ids);
      this.selectedRows = [];
    },
    // 编辑的处理
    editHandle(id) {
      this.modalVisble = true;
      this.submitOpType = 'edit';
      this.submitModalTitle = '编辑';
      this.getSubmitFormList();
      this.$emit('onSave', {
        id,
        done: (model) => {
          this.model = model;
        }
      });
      this.$nextTick(() => {
        this.$refs.submitModalForm.$refs[this.formRef].resetFields();
      });
      this.currentId = id;
    },
    // 获取提交表单的列表
    getSubmitFormList() {
      const opType = this.submitOpType;
      if (opType === 'add') {
        this.submitFormList = this.columnsObj.addFormList;
      } else if (opType === 'edit') {
        this.submitFormList = this.columnsObj.editFormList;
      }
      this.getFormAndRules();
    },
    // 获取form和rules
    getFormAndRules() {
      const newRules = {};
      const newForm = {};
      this.submitFormList.forEach((submitFormItem) => {
        const { prop, value, rules, defaultValue } = submitFormItem;

        newForm[prop] = defaultValue !== undefined ? defaultValue : value;
        newRules[prop] = rules;
      });

      this.model = newForm;
      this.rules = newRules;
      window.model = this.model;
    },
    // 确认删除的处理函数
    confirmDeleteHandle(id) {
      this.$emit('onDelete', 'delete', id);
    },
    // 提交添加的一个处理函数
    async submitHandle() {
      this.submitLoading = true;
      try {
        const validateRes = await this.$refs.submitModalForm.$refs[
          this.formRef
        ].validate();
        if (validateRes) {
          this.$emit('onSubmit', {
            opType: this.submitOpType,
            id: this.currentId,
            model: this.model,
            done: () => {
              this.submitLoading = false;

              // 提交完重置表单
              if (this.submitOpType === 'add') {
                this.$refs.submitModalForm.$refs[this.formRef].resetFields();
              }
            }
          });
        }
      } catch (e) {
        Promise.reject(e);
        this.$message.error('请先完成表单校验');
        this.submitLoading = false;
      }
    },
    // 重置处理
    resetHandle() {
      this.$refs.submitModalForm.$refs[this.formRef].resetFields();
      this.$message.success('重置信息成功!!');
    },

    noDeveloped() {
      this.$message.warning('该功能还没有开发..');
    },
    getIds() {
      const idProp = this.uRenderObj.idProp;
      const ids = this.selectedRows
        .map((selRow) => {
          return selRow[idProp];
        })
        .join(',');
      if (!ids) {
        return null;
      }
      return ids;
    }
  }
};
</script>

<style lang="less" scoped>
.manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-container,
.content-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.content-container {
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.list-container {
  margin-top: 10px;
  flex: 1 1 auto;
  overflow: hidden;

  /deep/ .ant-table {
    tr {
      td,
      th {
        min-width: 60px;
      }
    }
  }

  .manage-table {
    /deep/ .ant-table-body-inner,
    /deep/ .ant-table-body {
      overflow-y: auto !important;
      scrollbar-color: @primary-color @primary-2;
      scrollbar-width: thin;
      -ms-overflow-style: none;
      position: relative;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: @primary-color;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
        border-radius: 3px;
        background: @primary-3;
      }
    }
  }
}

// 操作按钮容器
.operate-btn-container {
  display: flex;

  .ant-btn {
    margin-right: 10px;
  }
}
</style>
