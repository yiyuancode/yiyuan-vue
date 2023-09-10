import * as admin from '@/api/sys/host';
import _ from 'lodash';

const monitorStatsList = [
  {
    label: '开启',
    value: 0
  },
  {
    label: '关闭',
    value: 1
  }
];

// 表格的table配置项
const columns = [
  {
    title: '主机名',
    dataIndex: 'hostName',
    key: 'hostName',
    rules: [{ required: true, message: '请输入主机名', trigger: 'blur' }],
    width: 160,
  },
  {
    title: 'IP地址',
    dataIndex: 'host',
    key: 'host',
    rules: [{ required: true, message: '请输入IP地址', trigger: 'blur' }],
    width: 160,
  },
  {
    title: 'SSH端口',
    dataIndex: 'sshPort',
    key: 'sshPort',
    rules: [{ required: true, message: '请输入SSH端口号', trigger: 'blur' }],
    width: 160,
  },
  {
    title: 'SSH登录用户名',
    dataIndex: 'sshUsername',
    key: 'sshUsername',
    rules: [{ required: true, message: '请输入SSH登录用户名', trigger: 'blur' }],
    width: 160,
  },
  {
    title: 'SSH登录密码',
    dataIndex: 'sshPassword',
    noShow: true,
    key: 'sshPassword',
    noSearch: true,
    props: {
      type: 'password'
    },
    rules: [{ required: true, message: '请输入SSH登录密码', trigger: 'blur' }],
    width: 160,
  },
  {
    title: '开启监控',
    dataIndex: 'isMonitorEnabled',
    key: 'isMonitorEnabled',
    valType: 'object',
    formType: 'radioGroup',
    props: {
      options: _.cloneDeep(monitorStatsList),
      style: { width: '100%' }
    },
    searchObj: {
      formType: 'select',
      options: monitorStatsList
    },
    rules: [
      { required: true, message: '请选择监控开启状态', trigger: 'change' }
    ],
    defaultValue: 0,
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    noAdd: true,
    noEdit: true,
    searchObj: {
      formType: 'rangePicker'
    },
    width: 160,
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    searchObj: {
      formType: 'rangePicker'
    },
    noAdd: true,
    noEdit: true,
    width: 160,
  }
];

// 模块配置
const moduleConfig = {
  module: admin,
  moduleAdd: 'addHost',
  moduleEdit: 'editHost',
  moduleDelete: 'deleteHost',
  moduleGetList: 'getHostPageList',
  moduleGetDetail: 'getHostDetail',
  moduleName: '用户'
};


// 权限对象
const permissionObj = {
  id: ['sys:host','sys:hostMonitor'],
  addBtn: 'sys:host:add',
  editBtn: 'sys:host:edit',
  deleteBtn: 'sys:host:delete',
  toHostMonitorBtn: 'sys:hostMonitor:queryCount'
}

// 渲染对象
const renderObj = {
  otherOperationList: [
    {
      name: "监控",
      methodName: "toHostMonitor",
      btnName: 'toHostMonitorBtn',
    }
  ]
}

export { columns, moduleConfig, permissionObj, renderObj };
