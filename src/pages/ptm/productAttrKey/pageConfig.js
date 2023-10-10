/**
 * 商品属性key页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as productAttrKey from '@/api/ptm/productAttrKey';

const columns = [
  {
    title: '商品属性key主键',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [
      { required: true, message: '请输入商品属性key主键', trigger: 'blur' }
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
    title: '商品分类id',
    dataIndex: 'ptmProductCategoryId',
    key: 'ptmProductCategoryId',
    width: 160,
    rules: [{ required: true, message: '请输入商品分类id', trigger: 'blur' }]
  },

  {
    title: '商品属性key',
    dataIndex: 'attrKey',
    key: 'attrKey',
    width: 160,
    rules: [{ required: true, message: '请输入商品属性key', trigger: 'blur' }]
  },

  {
    title: '是否显示0=否|1=是',
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
  module: productAttrKey,
  moduleAdd: 'addProductAttrKey',
  moduleEdit: 'editProductAttrKey',
  moduleDelete: 'deleteProductAttrKey',
  moduleGetList: 'getProductAttrKeyPageList',
  moduleGetDetail: 'getProductAttrKeyDetail',
  moduleName: '商品属性key'
};

// 权限对象
const permissionObj = {
  id: 'ptm:productAttrKey',
  addBtn: 'ptm:productAttrKey:add',
  editBtn: 'ptm:productAttrKey:edit',
  deleteBtn: 'ptm:productAttrKey:delete'
};

export { columns, moduleConfig, permissionObj };
