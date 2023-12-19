/**
 * 商品属性value页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as productAttrValue from '@/api/ptm/productAttrValue';
import {getEnumsMap} from "@/utils/enumsUtils.js";

const columns = [
  {
    title: '主键',
    dataIndex: 'id',
    key: 'id',
    width: 60,
    rules: [
      { required: true, message: '请输入商品属性值主键', trigger: 'blur' }
    ],
    noEdit: true,
    noAdd: true,
    scopedSlots: { customRender: 'id' },
  },

  {
    title: '商户',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 180,
    rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }],
    scopedSlots: { customRender: 'tenantId' },
  },

  {
    title: '属性',
    dataIndex: 'ptmProductAttrKeyId',
    key: 'ptmProductAttrKeyId',
    width: 280,
    rules: [
      { required: true, message: '请输入商品属性key表id', trigger: 'blur' }
    ],
    scopedSlots: { customRender: 'ptmProductAttrKeyId' },
  },

  {
    title: '属性值',
    dataIndex: 'attrValue',
    key: 'attrValue',
<<<<<<< HEAD
    width: 160,
    rules: [{ required: true, message: '请输入商品属性值', trigger: 'blur' }]
=======
    width: 200,
    rules: [
      { required: true, message: '请输入商品属性值', trigger: 'blur' }
    ]
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
  },

  {
    title: '状态',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 80,
    scopedSlots: { customRender: 'isShow' },
    props: {
      options: [
        {
          label: '隐藏',
          value: false
        },
        {
          label: '显示',
          value: true
        }
      ]
    },
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180,
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
    width: 180,
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
    width: 260,
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
  module: productAttrValue,
  moduleAdd: 'addProductAttrValue',
  moduleEdit: 'editProductAttrValue',
  moduleDelete: 'deleteProductAttrValue',
  moduleGetList: 'getProductAttrValuePageList',
  moduleGetDetail: 'getProductAttrValueDetail',
  moduleName: '商品属性value'
};

// 权限对象
const permissionObj = {
  id: 'ptm:productAttrValue',
  addBtn: 'ptm:productAttrValue:add',
  editBtn: 'ptm:productAttrValue:edit',
  deleteBtn: 'ptm:productAttrValue:delete'
};
const enumsMap = getEnumsMap(columns);
export { columns, moduleConfig, permissionObj, enumsMap };
