/**
 * 管理端用户页面组件配置配置
 *
 * @author  一源-花和尚
 * @date 2023-09-26
 */
import * as user from '@/api/sys/user';

const columns = [
  {
    title: '主键ID',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入主键ID', trigger: 'blur' }],
    noEdit: true,
    noAdd: true
  },

  {
    title: '商户id',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160
  },

  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 160,
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },

  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    width: 160,
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  },

  {
    title: '平台类型',
    dataIndex: 'platform',
    key: 'platform',
    width: 160,
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '平台端',
          value: 0
        },
        {
          label: '租户端',
          value: 1
        },
        {
          label: '移动端',
          value: 2
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '平台端',
          value: 0
        },
        {
          label: '租户端',
          value: 1
        },
        {
          label: '移动端',
          value: 2
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择平台类型', trigger: 'change' }],
    formSort: 1
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
  module: user,
  moduleAdd: 'addUser',
  moduleEdit: 'editUser',
  moduleDelete: 'deleteUser',
  moduleGetList: 'getUserPageList',
  moduleGetDetail: 'getUserDetail',
  moduleName: '管理端用户'
};

// 权限对象
const permissionObj = {
  id: 'sys:user',
  addBtn: 'sys:user:add',
  editBtn: 'sys:user:edit',
  deleteBtn: 'sys:user:delete'
};

export { columns, moduleConfig, permissionObj };
