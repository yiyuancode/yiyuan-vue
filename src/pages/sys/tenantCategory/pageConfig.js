/**
 * 租户店铺分类页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as tenantCategory from '@/api/sys/tenantCategory';

const columns = [

  {
    title: '店铺分类名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
  },

  {
    title: '店铺分类描述',
    dataIndex: 'desc',
    key: 'desc',
    width: 160,
  },

  {
    title: '删除标记',
    dataIndex: 'idDel',
    key: 'idDel',
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
    noSearch: true,
  },

];

// 模块配置
const moduleConfig = {
  module: tenantCategory,
  moduleAdd: 'addTenantCategory',
  moduleEdit: 'editTenantCategory',
  moduleDelete: 'deleteTenantCategory',
  moduleGetList: 'getTenantCategoryPageList',
  moduleGetDetail: 'getTenantCategoryDetail',
  moduleName: '租户店铺分类'
};


// 权限对象
const permissionObj = {
  id: 'sys:tenantCategory',
  addBtn: 'sys:tenantCategory:add',
  editBtn: 'sys:tenantCategory:edit',
  deleteBtn: 'sys:tenantCategory:delete',
}

export {columns, moduleConfig,permissionObj};
