/**
 * 平台商品分类页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
import * as productCategoryPlat from "@/api/ptm/productCategoryPlat";
import {getEnumsMap} from "@/utils/enumsUtils.js";

const columns = [
  {
    title: '平台商品分类id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    ellipsis: true,


    rules: [{required: true, message: '请输入平台商品分类id', trigger: 'blur'},],
    noEdit: true,
    noAdd: true,

    noSearch: true,
    noShow: true,
    noTable: true,

  },

  {
    title: '父id',
    dataIndex: 'pid',
    key: 'pid',
    width: 160,
    ellipsis: true,


    rules: [{required: true, message: '请输入父id', trigger: 'blur'},],

  },

  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    ellipsis: true,


    rules: [{required: true, message: '请输入分类名称', trigger: 'blur'},],

  },

  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 160,
    ellipsis: true,


  },

  {
    title: '分类级别',
    dataIndex: 'level',
    key: 'level',
    width: 160,
    ellipsis: true,


    scopedSlots: {customRender: 'level'},
    //值类型
    valType: "object",
    formType: "radioGroup",
    props: {
      options: [
        {
          label: '一级分类',
          value: 1,
        },
        {
          label: '二级分类',
          value: 2,
        },
        {
          label: '三级分类',
          value: 3,
        },
      ],
      style:
        {
          width: '100%'
        }
    },
    rules: [
      {required: true, message: '请选择分类级别', trigger: 'change'},
    ],
    formSort: 1,
    noEdit: true,
    noAdd: true,
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
    title: '创建用户',
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
    title: '修改用户',
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
  module: productCategoryPlat,
  moduleAdd: "addProductCategoryPlat",
  moduleEdit: "editProductCategoryPlat",
  moduleDelete: "deleteProductCategoryPlat",
  moduleGetList: "getProductCategoryPlatPageList",
  moduleGetDetail: "getProductCategoryPlatDetail",
  moduleName: "平台商品分类",
}

// 权限对象
const permissionObj = {
  id: 'ptm:productCategoryPlat',
  addBtn: 'ptm:productCategoryPlat:add',
  editBtn: 'ptm:productCategoryPlat:edit',
  deleteBtn: 'ptm:productCategoryPlat:delete'
};
//转化map
const enumsMap = getEnumsMap(columns);
export {
  columns,
  moduleConfig,
  permissionObj,
  enumsMap
};
