import * as admin from '@/api/auth/admin';

// 表格的table配置项
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    noShow: true,
    noSearch: true,
    props: {
      type: 'password'
    },
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    noEdit: true
  },
  {
    title: '确认密码',
    dataIndex: 'rePassword',
    key: 'rePassword',
    props: {
      type: 'password'
    },
    noShow: true,
    rules: function () {
      return [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validatePassWord.bind(this), trigger: 'blur' }
      ];
    },
    noEdit: true,
    noSearch: true
  },
  {
    title: '角色',
    dataIndex: 'userRoles',
    key: 'userRoles',
    scopedSlots: { customRender: 'userRoles' },
    noAdd: true,
    noEdit: true,
    noSearch: true
  },
  {
    title: '所属平台',
    dataIndex: 'platform',
    key: 'platform',
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
    noAdd: true,
    noEdit: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    searchObj: {
      formType: 'rangePicker'
    },
    noAdd: true,
    noEdit: true
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    searchObj: {
      formType: 'rangePicker'
    },
    noAdd: true,
    noEdit: true
  }
];

// 模块配置
const moduleConfig = {
  module: admin,
  moduleAdd: 'addAdmin',
  moduleEdit: 'editAdmin',
  moduleDelete: 'deleteAdmin',
  moduleGetList: 'getAdminPageList',
  moduleGetDetail: 'getAdminDetail',
  moduleName: '用户'
};

// 校验密码
function validatePassWord(rule, value, callback) {
  if (value !== this.model.password) {
    callback(new Error('两次密码输入不一致'));
  } else {
    callback();
  }
}

export { columns, moduleConfig };
