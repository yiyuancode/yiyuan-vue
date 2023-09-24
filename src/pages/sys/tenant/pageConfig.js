/**
 * 商户页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-09-09
 */
import * as tenant from '@/api/sys/tenant';
import * as area from '@/api/sys/area';

const columns = [
  {
    title: '商户id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{required: true, message: '请输入商户id', trigger: 'blur'}],
    noEdit: true,
    noAdd: true,
    noShow: true,
    ellipsis: true,
  },

  {
    title: '归属区域',
    dataIndex: 'spmShopCityId',
    key: 'spmShopCityId',
    width: 160,
    rules: [{required: true, message: '请输入归属区域', trigger: 'blur'}],
    //值类型
    formType: 'cascader',
    props: {
      url: area.getCityTree
    },
    options: [],
    fieldNames: {label: 'name', value: 'id', children: 'child'},
    scopedSlots: {
      customRender: "spmShopCityIdZh"
    },
    ellipsis: true,
  },

  {
    title: '商户名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    rules: [{required: true, message: '请输入商户名称', trigger: 'blur'}],
    ellipsis: true,
  },

  {
    title: '法人名称',
    dataIndex: 'legalPersonName',
    key: 'legalPersonName',
    width: 160,
    rules: [{required: true, message: '请输入法人名称', trigger: 'blur'}],
    ellipsis: true,
  },

  {
    title: '联系邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 160,
    rules: [{required: true, message: '请输入联系邮箱', trigger: 'blur'}],
    ellipsis: true,
  },

  {
    title: '联系手机',
    dataIndex: 'phone',
    key: 'phone',
    width: 160,
    rules: [{required: true, message: '请输入联系手机', trigger: 'blur'}],
    ellipsis: true,
  },

  {
    title: '详细地址',
    dataIndex: 'detailedAddress',
    key: 'detailedAddress',
    width: 160,
    rules: [{required: true, message: '请输入详细地址', trigger: 'blur'}],
    ellipsis: true,
  },

  {
    title: '统一社会信用代码',
    dataIndex: 'socialCreditCode',
    key: 'socialCreditCode',
    width: 160,
    rules: [
      {required: true, message: '请输入统一社会信用代码', trigger: 'blur'}
    ],
    ellipsis: true,
  },

  {
    title: '营业执照电子版',
    dataIndex: 'businessLicenseImage',
    key: 'businessLicenseImage',
    width: 160,
    rules: [
      {required: true, message: '请输入营业执照电子版', trigger: 'blur'}
    ],
    formType: 'upload',
    fileUrl: null,
    ellipsis: true,
  },

  {
    title: '法人身份证正面',
    dataIndex: 'legalPersonIdFrontImage',
    key: 'legalPersonIdFrontImage',
    width: 160,
    rules: [
      {required: true, message: '请输入法人身份证正面', trigger: 'blur'}
    ],
    formType: 'upload',
    fileUrl: null,
    ellipsis: true,
  },

  {
    title: '法人身份证反面',
    dataIndex: 'legalPersonIdBackImage',
    key: 'legalPersonIdBackImage',
    width: 160,
    rules: [
      {required: true, message: '请输入法人身份证反面', trigger: 'blur'}
    ],
    formType: 'upload',
    fileUrl: null,
    ellipsis: true,
  },

  {
    title: '申请备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 160,
    rules: [{required: true, message: '请输入申请备注', trigger: 'blur'}],
    ellipsis: true,
  },

  {
    title: '入驻状态',
    dataIndex: 'status',
    key: 'status',
    width: 160,
    //值类型
    valType: 'object',
    formType: 'Select',
    props: {
      options: [
        {
          label: '待审核',
          value: 0
        },
        {
          label: '通过',
          value: 1
        },
        {
          label: '被驳回',
          value: 2
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择入驻状态', trigger: 'change'}],
    defaultValue: 0,
    formSort: 1,
    ellipsis: true,
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 50,
    ellipsis: true,
    noSearch: true,
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
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [{required: true, message: '请选择创建时间', trigger: 'change'}];
    },
    noEdit: true,
    noAdd: true,
    ellipsis: true,
  },

  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 160,
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
    ellipsis: true,
  },

  {
    title: '创建人',
    dataIndex: 'createUser',
    key: 'createUser',
    width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true,
    ellipsis: true,
  },

  {
    title: '修改人',
    dataIndex: 'updateUser',
    key: 'updateUser',
    width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true,
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 180,
    scopedSlots: {customRender: 'action'},
    noSearch: true,
  },
];


// 模块配置
const moduleConfig = {
  module: tenant,
  moduleAdd: 'addTenant',
  moduleEdit: 'editTenant',
  moduleDelete: 'deleteTenant',
  moduleGetList: 'getTenantPageList',
  moduleGetDetail: 'getTenantDetail',
  getCityTree: 'getCityTree',
  moduleName: '商户'
};

// 权限对象
const permissionObj = {
  id: 'sys:tenant',
  addBtn: 'sys:tenant:add',
  editBtn: 'sys:tenant:edit',
  deleteBtn: 'sys:tenant:delete'
  // assignRoleBtn: 'sys:tenant:assignRole',
};
// 渲染对象
const renderObj = {
  otherOperationList: [
    {
      name: '分配',
      methodName: 'apply',
      btnName: 'apply'
    }
  ]
};
export {columns, moduleConfig, permissionObj, renderObj};
