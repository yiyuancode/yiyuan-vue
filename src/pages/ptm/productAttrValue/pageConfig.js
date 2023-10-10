/**
 * 商品属性value页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as productAttrValue from '@/api/ptm/productAttrValue';

const columns = [
  {
    title: '商品属性value主键',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [
      { required: true, message: '请输入商品属性value主键', trigger: 'blur' }
    ],
    noEdit: true,
    noAdd: true
  },

  {
    title: '商户id',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160,
    rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }]
  },

  {
    title: '商品属性key表id',
    dataIndex: 'ptmProductAttrKeyId',
    key: 'ptmProductAttrKeyId',
    width: 160,
    rules: [
      { required: true, message: '请输入商品属性key表id', trigger: 'blur' }
    ]
  },

  {
    title: '商品属性value值',
    dataIndex: 'attrValue',
    key: 'attrValue',
    width: 160,
    rules: [
      { required: true, message: '请输入商品属性value值', trigger: 'blur' }
    ]
  },

  {
    title: '是否上架0=否|1=是',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 160
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
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

export { columns, moduleConfig, permissionObj };
