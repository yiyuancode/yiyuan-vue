/**
 * 物流模板页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
import * as freightTemp from '@/api/ftm/freightTemp';
import { getEnumsMap } from '@/utils/enumsUtils.js';

const columns = [
  {
    title: '模板id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    ellipsis: true,

    rules: [{ required: true, message: '请输入模板id', trigger: 'blur' }],
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

    rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }],
    scopedSlots: { customRender: 'tenantId' }
  },

  {
    title: '模板名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    ellipsis: true,

    rules: [{ required: true, message: '请输入模板名称', trigger: 'blur' }]
  },

  {
    title: '包邮类型',
    dataIndex: 'packageType',
    key: 'packageType',
    width: 160,
    ellipsis: true,

    scopedSlots: { customRender: 'packageType' },
    //值类型
    valType: 'object',
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '全部包邮',
          value: 0
        },
        {
          label: '部分包邮',
          value: 1
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择包邮类型', trigger: 'change' }],
    defaultValue: 0,
    formSort: 1
  },

  {
    title: '计费类型',
    dataIndex: 'chargeType',
    key: 'chargeType',
    width: 160,
    ellipsis: true,

    scopedSlots: { customRender: 'chargeType' },
    //值类型
    valType: 'object',
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '按个数',
          value: 0
        },
        {
          label: '按重量',
          value: 1
        },
        {
          label: '按体积',
          value: 2
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择计费类型', trigger: 'change' }],
    defaultValue: 0,
    formSort: 1
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
  module: freightTemp,
  moduleAdd: 'addFreightTemp',
  moduleEdit: 'editFreightTemp',
  moduleDelete: 'deleteFreightTemp',
  moduleGetList: 'getFreightTempPageList',
  moduleGetDetail: 'getFreightTempDetail',
  moduleName: '物流模板'
};

// 权限对象
const permissionObj = {
  id: 'ftm:freightTemp',
  addBtn: 'ftm:freightTemp:add',
  editBtn: 'ftm:freightTemp:edit',
  deleteBtn: 'ftm:freightTemp:delete'
};
//转化map
const enumsMap = getEnumsMap(columns);
export { columns, moduleConfig, permissionObj, enumsMap };
