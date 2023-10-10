/**
 * 品牌页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as productBrand from '@/api/ptm/productBrand';

const columns = [
  {
    title: '品牌id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入品牌id', trigger: 'blur' }],
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
    title: '品牌名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    rules: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }]
  },

  {
    title: '品牌图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 160,
    rules: [{ required: true, message: '请输入品牌图标', trigger: 'blur' }]
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160
  },

  {
    title: '状态0=不显示|1=显示',
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
  module: productBrand,
  moduleAdd: 'addProductBrand',
  moduleEdit: 'editProductBrand',
  moduleDelete: 'deleteProductBrand',
  moduleGetList: 'getProductBrandPageList',
  moduleGetDetail: 'getProductBrandDetail',
  moduleName: '品牌'
};

// 权限对象
const permissionObj = {
  id: 'ptm:productBrand',
  addBtn: 'ptm:productBrand:add',
  editBtn: 'ptm:productBrand:edit',
  deleteBtn: 'ptm:productBrand:delete'
};

export { columns, moduleConfig, permissionObj };
