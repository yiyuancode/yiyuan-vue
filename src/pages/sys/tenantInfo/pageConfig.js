/**
 * 租户信息页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as tenantInfo from '@/api/sys/tenantInfo';

const columns = [

  {
    title: '租户ID',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160,
  },
  {
    title: '结算类型',
    dataIndex: 'settlementType',
    key: 'settlementType',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '银行卡',
          value: 0
        },
        {
          label: '微信',
          value: 1
        },
        {
          label: '支付宝',
          value: 2
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '银行卡',
          value: 0
        },
        {
          label: '微信',
          value: 1
        },
        {
          label: '支付宝',
          value: 2
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择结算类型', trigger: 'change'}],
    defaultValue: 0,
    formSort: 1,
    width: 160,
  },

  {
    title: '持卡人姓名',
    dataIndex: 'cardholderName',
    key: 'cardholderName',
    rules: [{required: true, message: '请输入持卡人姓名', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '银行名称',
    dataIndex: 'cardholderBank',
    key: 'cardholderBank',
    rules: [{required: true, message: '请输入银行名称', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '银行卡号',
    dataIndex: 'cardholderNo',
    key: 'cardholderNo',
    rules: [{required: true, message: '请输入银行卡号', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '开户地址',
    dataIndex: 'bankAddress',
    key: 'bankAddress',
    rules: [{required: true, message: '请输入开户地址', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '微信号',
    dataIndex: 'wechatCode',
    key: 'wechatCode',
    rules: [{required: true, message: '请输入微信号', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '微信收款二维码',
    dataIndex: 'wechatQrcodeUrl',
    key: 'wechatQrcodeUrl',
    rules: [
      {required: true, message: '请输入微信收款二维码', trigger: 'blur'}
    ],
    width: 160,
  },

  {
    title: '支付宝账号',
    dataIndex: 'alipayCode',
    key: 'alipayCode',
    rules: [{required: true, message: '请输入支付宝账号', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '支付宝收款二维码',
    dataIndex: 'alipayQrcodeUrl',
    key: 'alipayQrcodeUrl',
    width: 160,
  },

  {
    title: '警戒库存',
    dataIndex: 'alertStock',
    key: 'alertStock',
    width: 160,
  },

  {
    title: '客服类型',
    dataIndex: 'serviceType',
    key: 'serviceType',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: 'H5链接',
          value: 0
        },
        {
          label: '电话',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: 'H5链接',
          value: 0
        },
        {
          label: '电话',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择客服类型', trigger: 'change'}],
    formSort: 1,
    width: 160,
  },

  {
    title: '客服H5链接',
    dataIndex: 'serviceLink',
    key: 'serviceLink',
    rules: [{required: true, message: '请输入客服H5链接', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '客服电话',
    dataIndex: 'servicePhone',
    key: 'servicePhone',
    rules: [{required: true, message: '请输入客服电话', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '真实姓名',
    dataIndex: 'realName',
    key: 'realName',
    rules: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
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
  module: tenantInfo,
  moduleAdd: 'addTenantInfo',
  moduleEdit: 'editTenantInfo',
  moduleDelete: 'deleteTenantInfo',
  moduleGetList: 'getTenantInfoPageList',
  moduleGetDetail: 'getTenantInfoDetail',
  moduleName: '租户信息'
};

// 权限对象
const permissionObj = {
  id: 'sys:tenantInfo',
  addBtn: 'sys:tenantInfo:add',
  editBtn: 'sys:tenantInfo:edit',
  deleteBtn: 'sys:tenantInfo:delete',
}

export {columns, moduleConfig,permissionObj};
