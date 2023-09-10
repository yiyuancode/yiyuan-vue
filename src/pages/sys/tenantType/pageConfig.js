/**
 * 租户类型页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as tenantType from '@/api/sys/tenantType';

const columns = [


  {
    title: '租户分类名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
  },

  {
    title: '租户初始化手续费%',
    dataIndex: 'transFee',
    key: 'transFee',
    width: 160,
  },

  {
    title: '租户分类删除标记',
    dataIndex: 'isDel',
    key: 'isDel',
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
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [{required: true, message: '请选择创建时间', trigger: 'change'}];
    },
    noEdit: true,
    noAdd: true,
    width: 160,
  },

  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    searchObj: {
      formType: 'rangePicker'
    },
    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [{required: true, message: '请选择更新时间', trigger: 'change'}];
    },
    noEdit: true,
    noAdd: true,
    noSearch: true
  },

];

// 模块配置
const moduleConfig = {
  module: tenantType,
  moduleAdd: 'addTenantType',
  moduleEdit: 'editTenantType',
  moduleDelete: 'deleteTenantType',
  moduleGetList: 'getTenantTypePageList',
  moduleGetDetail: 'getTenantTypeDetail',
  moduleName: '租户类型'
};

// 权限对象
const permissionObj = {
  id: 'sys:tenantType',
  addBtn: 'sys:tenantType:add',
  editBtn: 'sys:tenantType:edit',
  deleteBtn: 'sys:tenantType:delete',
}

export {columns, moduleConfig,permissionObj};
