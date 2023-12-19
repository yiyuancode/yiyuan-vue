/**
 * 物流模板价格页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
import * as freightTempPrice from '@/api/ftm/freightTempPrice';
import { getEnumsMap } from '@/utils/enumsUtils.js';

const columns = [
  {
    title: '物流模板价格id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    ellipsis: true,

    rules: [
      { required: true, message: '请输入物流模板价格id', trigger: 'blur' }
    ],
    noEdit: true,
    noAdd: true,

    noSearch: true,
    noShow: true,
    noTable: true
  },

  {
    title: '商户id',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160,
    ellipsis: true,

    rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }]
  },

  {
    title: '运费模板id',
    dataIndex: 'ftmFreightTempId',
    key: 'ftmFreightTempId',
    width: 160,
    ellipsis: true,

    rules: [{ required: true, message: '请输入运费模板id', trigger: 'blur' }]
  },

  {
    title: '城市区域ids(区域最后一级,多个逗号分割)',
    dataIndex: 'sysAreaIds',
    key: 'sysAreaIds',
    width: 160,
    ellipsis: true,

    rules: [
      {
        required: true,
        message: '请输入城市区域ids(区域最后一级,多个逗号分割)',
        trigger: 'blur'
      }
    ]
  },

  {
    title: '首-数量',
    dataIndex: 'firstNum',
    key: 'firstNum',
    width: 160,
    ellipsis: true
  },

  {
    title: '首-价格',
    dataIndex: 'firstPrice',
    key: 'firstPrice',
    width: 160,
    ellipsis: true
  },

  {
    title: '续-数量',
    dataIndex: 'nextNum',
    key: 'nextNum',
    width: 160,
    ellipsis: true
  },

  {
    title: '续-价格',
    dataIndex: 'nextPrice',
    key: 'nextPrice',
    width: 160,
    ellipsis: true
  },

  {
    title: '满数量减包邮',
    dataIndex: 'fullPackageNum',
    key: 'fullPackageNum',
    width: 160,
    ellipsis: true
  },

  {
    title: '满价格减包邮',
    dataIndex: 'fullPackagePrice',
    key: 'fullPackagePrice',
    width: 160,
    ellipsis: true
  },

  {
    title: '是否包邮',
    dataIndex: 'isPackage',
    key: 'isPackage',
    width: 160,
    ellipsis: true,

    scopedSlots: { customRender: 'isPackage' },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '否',
          value: false
        },
        {
          label: '是',
          value: true
        }
      ],
      style: {
        width: '100%'
      }
    }
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160,
    ellipsis: true
  },

  {
    title: '是否显示',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 160,
    ellipsis: true,

    scopedSlots: { customRender: 'isShow' },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '否',
          value: false
        },
        {
          label: '是',
          value: true
        }
      ],
      style: {
        width: '100%'
      }
    }
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    ellipsis: true,

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
    ellipsis: true,

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
    ellipsis: true,

    noEdit: true,
    noAdd: true,

    noSearch: true,
    noShow: true,
    noTable: true
  },

  {
    title: '修改人',
    dataIndex: 'updateUser',
    key: 'updateUser',
    width: 160,
    ellipsis: true,

    noEdit: true,
    noAdd: true,

    noSearch: true,
    noShow: true,
    noTable: true
  },

  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 110,
    ellipsis: true,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
];

// 模块配置
const moduleConfig = {
  module: freightTempPrice,
  moduleAdd: 'addFreightTempPrice',
  moduleEdit: 'editFreightTempPrice',
  moduleDelete: 'deleteFreightTempPrice',
  moduleGetList: 'getFreightTempPricePageList',
  moduleGetDetail: 'getFreightTempPriceDetail',
  moduleName: '物流模板价格'
};

// 权限对象
const permissionObj = {
  id: 'ftm:freightTempPrice',
  addBtn: 'ftm:freightTempPrice:add',
  editBtn: 'ftm:freightTempPrice:edit',
  deleteBtn: 'ftm:freightTempPrice:delete'
};
//转化map
const enumsMap = getEnumsMap(columns);
export { columns, moduleConfig, permissionObj, enumsMap };
