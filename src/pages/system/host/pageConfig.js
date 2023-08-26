/**
 * 主机记录页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as host from '@/api/sys/host';

const columns = [
  {
    title: '主键ID',
    dataIndex: 'id',
    key: 'id',

    rules: [{ required: true, message: '请输入主键ID', trigger: 'blur' }],
    noEdit: true,
    noAdd: true
  },

  {
    title: '主机名',
    dataIndex: 'hostName',
    key: 'hostName',

    rules: [{ required: true, message: '请输入主机名', trigger: 'blur' }]
  },

  {
    title: 'IP地址',
    dataIndex: 'host',
    key: 'host',

    rules: [{ required: true, message: '请输入IP地址', trigger: 'blur' }]
  },

  {
    title: 'SSH端口',
    dataIndex: 'sshPort',
    key: 'sshPort'
  },

  {
    title: 'SSH登录用户名',
    dataIndex: 'sshUsername',
    key: 'sshUsername',

    rules: [{ required: true, message: '请输入SSH登录用户名', trigger: 'blur' }]
  },

  {
    title: 'SSH登录密码',
    dataIndex: 'sshPassword',
    key: 'sshPassword',

    rules: [{ required: true, message: '请输入SSH登录密码', trigger: 'blur' }]
  },

  {
    title: '开启监控',
    dataIndex: 'isMonitorEnabled',
    key: 'isMonitorEnabled',
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
    key: 'sortBy'
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
    noAdd: true
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
    noSearch: true
  },

  {
    title: '创建人',
    dataIndex: 'createUser',
    key: 'createUser',

    noEdit: true,
    noAdd: true,
    noSearch: true
  },

  {
    title: '修改人',
    dataIndex: 'updateUser',
    key: 'updateUser',

    noEdit: true,
    noAdd: true,
    noSearch: true
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
  moduleName: '主机记录'
};

export { columns, moduleConfig };
