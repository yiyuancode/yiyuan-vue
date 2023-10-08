/**
 * 服务器页面组件配置配置
 *
 * @author  红枣粽子
 * @date 2023-10-08
 */
import * as host from '@/api/sys/host';

const columns = [
  {
    title: '主键ID',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入主键ID', trigger: 'blur' }],
    noEdit: true,
    noAdd: true,
    noShow: true
  },

  {
    title: '主机名',
    dataIndex: 'hostName',
    key: 'hostName',
    width: 160,
    rules: [{ required: true, message: '请输入主机名', trigger: 'blur' }]
  },

  {
    title: 'IP地址',
    dataIndex: 'host',
    key: 'host',
    width: 160,
    rules: [{ required: true, message: '请输入IP地址', trigger: 'blur' }]
  },

  {
    title: 'SSH端口',
    dataIndex: 'sshPort',
    key: 'sshPort',
    width: 160
  },

  {
    title: 'SSH登录用户名',
    dataIndex: 'sshUsername',
    key: 'sshUsername',
    width: 160,
    rules: [{ required: true, message: '请输入SSH登录用户名', trigger: 'blur' }]
  },

  {
    title: 'SSH登录密码',
    dataIndex: 'sshPassword',
    key: 'sshPassword',
    width: 160,
    rules: [{ required: true, message: '请输入SSH登录密码', trigger: 'blur' }]
  },

  {
    title: '开启监控',
    dataIndex: 'isMonitorEnabled',
    key: 'isMonitorEnabled',
    width: 160,
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '开启',
          value: 0
        },
        {
          label: '关闭',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '开启',
          value: 0
        },
        {
          label: '关闭',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择开启监控', trigger: 'change' }],
    formSort: 1
  },

  {
    title: '排序字段',
    dataIndex: 'sortBy',
    key: 'sortBy',
    width: 160,
    noShow: true
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
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
    noAdd: true
  },

  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 160,
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
    noSearch: true
  },

  {
    title: '创建人',
    dataIndex: 'createUser',
    key: 'createUser',
    width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true
  },

  {
    title: '修改人',
    dataIndex: 'updateUser',
    key: 'updateUser',
    width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true
  }
];

// 模块配置
const moduleConfig = {
  module: host,
  moduleAdd: 'addHost',
  moduleEdit: 'editHost',
  moduleDelete: 'deleteHost',
  moduleGetList: 'getHostPageList',
  moduleGetDetail: 'getHostDetail',
  moduleName: '服务器'
};

// 权限对象
const permissionObj = {
  id: 'sys:host',
  addBtn: 'sys:host:add',
  editBtn: 'sys:host:edit',
  deleteBtn: 'sys:host:delete'
};

export { columns, moduleConfig, permissionObj };
