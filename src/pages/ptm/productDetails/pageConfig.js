/**
 * 商品详情页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as productDetails from '@/api/ptm/productDetails';

const columns = [
  {
    title: '商品id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入商品id', trigger: 'blur' }],
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
    title: '商品id',
    dataIndex: 'ptmProductId',
    key: 'ptmProductId',
    width: 160,
    rules: [{ required: true, message: '请输入商品id', trigger: 'blur' }]
  },

  {
    title: '商品详情(富文本)',
    dataIndex: 'details',
    key: 'details',
    width: 160,
    formType: 'text'
  }
];

// 模块配置
const moduleConfig = {
  module: productDetails,
  moduleAdd: 'addProductDetails',
  moduleEdit: 'editProductDetails',
  moduleDelete: 'deleteProductDetails',
  moduleGetList: 'getProductDetailsPageList',
  moduleGetDetail: 'getProductDetailsDetail',
  moduleName: '商品详情'
};

// 权限对象
const permissionObj = {
  id: 'ptm:productDetails',
  addBtn: 'ptm:productDetails:add',
  editBtn: 'ptm:productDetails:edit',
  deleteBtn: 'ptm:productDetails:delete'
};

export { columns, moduleConfig, permissionObj };
