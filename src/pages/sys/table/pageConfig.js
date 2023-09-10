/**
 * 数据库页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as table from '@/api/sys/table';

const columns = [

  {
    title: '表名',
    dataIndex: 'name',
    key: 'name',
    rules: [{ required: true, message: '请输入表名', trigger: 'blur' }],
    width: 160,
  },

  {
    title: '表注释',
    dataIndex: 'remark',
    key: 'remark',
    rules: [{ required: true, message: '请输入表注释', trigger: 'blur' }],
    width: 160,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    searchObj: {
      formType: 'rangePicker'
    },
    props: {
      showTime: true,
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择创建时间', trigger: 'change' }];
    },
    noEdit: true,
    noAdd: true,

  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    searchObj: {
      formType: 'rangePicker'
    },
    props: {
      showTime: true,
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择修改时间', trigger: 'change' }];
    },
    noEdit: true,
    noAdd: true,
    noSearch: true,

  },


];

// 模块配置
const moduleConfig = {
  module: table,
  moduleAdd: 'addTable',
  moduleEdit: 'editTable',
  moduleDelete: 'deleteTable',
  moduleGetList: 'getTablePageList',
  moduleGetDetail: 'getTableDetail',
  moduleName: '数据库'
};

// 权限对象
const permissionObj = {
  id: 'sys:table',
  addBtn: 'sys:table:add',
  editBtn: 'sys:table:edit',
  deleteBtn: 'sys:table:delete',
  // assignRoleBtn: 'sys:tenant:assignRole',
}


export { columns, moduleConfig, permissionObj };
