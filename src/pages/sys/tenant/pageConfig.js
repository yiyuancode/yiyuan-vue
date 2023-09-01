/**
 * 租户页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as tenant from '@/api/sys/tenant';

const columns = [

  {
    title: '租户店铺分类id',
    dataIndex: 'tenantCategoryId',
    key: 'tenantCategoryId',
    rules: [
      {required: true, message: '请输入租户店铺分类id', trigger: 'blur'}
    ],
    width: 160,
  },

  {
    title: '租户分类id',
    dataIndex: 'tenantTypeId',
    key: 'tenantTypeId',
    rules: [{required: true, message: '请输入租户分类id', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '租户名称',
    dataIndex: 'name',
    key: 'name',
    rules: [{required: true, message: '请输入租户名称', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '租户法人',
    dataIndex: 'loard',
    key: 'loard',
    rules: [{required: true, message: '请输入租户法人', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '租户邮箱',
    dataIndex: 'email',
    key: 'email',
    rules: [{required: true, message: '请输入租户邮箱', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '租户手机号',
    dataIndex: 'phone',
    key: 'phone',
    rules: [{required: true, message: '请输入租户手机号', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '平台手续费',
    dataIndex: 'transFee',
    key: 'transFee',
    width: 110,
  },

  {
    title: '租户地址',
    dataIndex: 'address',
    key: 'address',
    width: 110,
  },

  {
    title: '租户地理位置坐标',
    dataIndex: 'location',
    key: 'location',
    width: 160,
  },

  {
    title: '是否自营',
    dataIndex: 'isSelf',
    key: 'isSelf',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '非自营',
          value: 0
        },
        {
          label: '自营',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '非自营',
          value: 0
        },
        {
          label: '自营',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择是否自营', trigger: 'change'}],
    defaultValue: 0,
    formSort: 1,
    width: 160,
  },

  {
    title: '是否推荐',
    dataIndex: 'isRecome',
    key: 'isRecome',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '不推荐',
          value: 0
        },
        {
          label: '推荐',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '不推荐',
          value: 0
        },
        {
          label: '推荐',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择是否推荐', trigger: 'change'}],
    defaultValue: 0,
    formSort: 1,
    width: 160,
  },

  {
    title: '商户开关',
    dataIndex: 'isClose',
    key: 'isClose',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '未关闭',
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
          label: '未关闭',
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
    rules: [{required: true, message: '请选择商户开关', trigger: 'change'}],
    defaultValue: 0,
    formSort: 1,
    width: 160,
  },

  {
    title: '商品是否审核',
    dataIndex: 'isProductAudit',
    key: 'isProductAudit',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '不审核',
          value: 0
        },
        {
          label: '审核',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '不审核',
          value: 0
        },
        {
          label: '审核',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [
      {required: true, message: '请选择商品是否审核', trigger: 'change'}
    ],
    defaultValue: 0,
    formSort: 1,
    width: 160,
  },

  {
    title: '商品自提',
    dataIndex: 'isSelfPickup',
    key: 'isSelfPickup',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '不自提',
          value: 0
        },
        {
          label: '自提',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '不自提',
          value: 0
        },
        {
          label: '自提',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择商品自提', trigger: 'change'}],
    defaultValue: 0,
    formSort: 1,
    width: 160,
  },

  {
    title: '租户备注',
    dataIndex: 'note',
    key: 'note',
    width: 160,
  },

  {
    title: '租户资质图片',
    dataIndex: 'credential',
    key: 'credential',
    rules: [{required: true, message: '请输入租户资质图片', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '租户背景图',
    dataIndex: 'background',
    key: 'background',
    width: 160,
  },

  {
    title: '租户头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 160,
  },

  {
    title: '租户logo',
    dataIndex: 'rectangleLogo',
    key: 'rectangleLogo',
    width: 160,
  },

  {
    title: '租户封面图',
    dataIndex: 'coverImage',
    key: 'coverImage',
    width: 160,
  },

  {
    title: '租户排行背景图',
    dataIndex: 'rankingBackground',
    key: 'rankingBackground',
    width: 160,
  },

  {
    title: '租户简介，商城显示',
    dataIndex: 'overview',
    key: 'overview',
    width: 160,
  },

  {
    title: '租户余额',
    dataIndex: 'balance',
    key: 'balance',
    width: 160,
  },

  {
    title: '租户星级',
    dataIndex: 'starLevel',
    key: 'starLevel',
    width: 160,
  },

  {
    title: 'pc商城banner',
    dataIndex: 'bannerPc',
    key: 'bannerPc',
    width: 160,
  },

  {
    title: 'pc商城背景图',
    dataIndex: 'groundImagePc',
    key: 'groundImagePc',
    width: 160,
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160,
  },

  {
    title: '创建类型',
    dataIndex: 'createType',
    key: 'createType',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '平台创建',
          value: 0
        },
        {
          label: '自主申请',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '平台创建',
          value: 0
        },
        {
          label: '自主申请',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    formSort: 1,
    width: 160,
  },

  {
    title: '创建者id',
    dataIndex: 'createdId',
    key: 'createdId',
    width: 160,
  },

  {
    title: '商城标记',
    dataIndex: 'isDel',
    key: 'isDel',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '未删除',
          value: 0
        },
        {
          label: '已删除',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '未删除',
          value: 0
        },
        {
          label: '已删除',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择商城标记', trigger: 'change'}],
    defaultValue: 0,
    formSort: 1,
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
  module: tenant,
  moduleAdd: 'addTenant',
  moduleEdit: 'editTenant',
  moduleDelete: 'deleteTenant',
  moduleGetList: 'getTenantPageList',
  moduleGetDetail: 'getTenantDetail',
  moduleName: '租户'
};

export {columns, moduleConfig};
