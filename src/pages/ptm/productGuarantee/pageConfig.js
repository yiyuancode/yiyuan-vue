/**
 * 保障服务页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-11-09
 */
import * as productGuarantee from "@/api/ptm/productGuarantee";
import {getEnumsMap} from "@/utils/enumsUtils.js";

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    ellipsis: true,
    rules: [{required: true, message: '请输入保障服务id', trigger: 'blur'},],
    noEdit: true,
    noAdd: true,

    noSearch: true,
    noShow: true,
    noTable: true,

  },

  {
    title: '商户',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160,
    ellipsis: true,


    rules: [{required: true, message: '请输入商户', trigger: 'blur'},],
    scopedSlots: {customRender: 'tenantId'},

  },

  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    ellipsis: true,


    rules: [{required: true, message: '请输入保障服务名称', trigger: 'blur'},],

  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160,
    ellipsis: true,


  },

  {
    title: '是否显示',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 160,
    ellipsis: true,


    scopedSlots: {customRender: 'isShow'},
    formType: "radioGroup",
    props: {
      options: [
        {
          label: '否',
          value: false,
        },
        {
          label: '是',
          value: true,
        },
      ],
      style:
        {
          width: '100%'
        }
    },

  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    ellipsis: true,


    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: "datePicker",
    rules: function () {
      return [
        {required: true, message: '请选择创建时间', trigger: 'change'},
      ]
    },
    noEdit: true,
    noAdd: true,


  },

  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 160,
    ellipsis: true,


    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: "datePicker",
    rules: function () {
      return [
        {required: true, message: '请选择修改时间', trigger: 'change'},
      ]
    },
    noEdit: true,
    noAdd: true,

    noSearch: true,

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
    noTable: true,

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
    noTable: true,

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
    fixed: "right",
    scopedSlots: {customRender: "action"}

  },
]


// 模块配置
const moduleConfig = {
  module: productGuarantee,
  moduleAdd: "addProductGuarantee",
  moduleEdit: "editProductGuarantee",
  moduleDelete: "deleteProductGuarantee",
  moduleGetList: "getProductGuaranteePageList",
  moduleGetDetail: "getProductGuaranteeDetail",
  moduleName: "保障服务",
}

// 权限对象
const permissionObj = {
  id: 'ptm:productGuarantee',
  addBtn: 'ptm:productGuarantee:add',
  editBtn: 'ptm:productGuarantee:edit',
  deleteBtn: 'ptm:productGuarantee:delete'
};
//转化map
const enumsMap = getEnumsMap(columns);
export {
  columns,
  moduleConfig,
  permissionObj,
  enumsMap
};
