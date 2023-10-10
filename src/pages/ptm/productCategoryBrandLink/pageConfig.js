/**
 * 商品类型—品牌中间页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as productCategoryBrandLink from '@/api/ptm/productCategoryBrandLink';

const columns = [
  {
    title: '品牌id',
    dataIndex: 'ptmProductBrandId',
    key: 'ptmProductBrandId',
    width: 160
  },

  {
    title: '商品类型id',
    dataIndex: 'ptmProductCategoryId',
    key: 'ptmProductCategoryId',
    width: 160
  }
];

// 模块配置
const moduleConfig = {
  module: productCategoryBrandLink,
  moduleAdd: 'addProductCategoryBrandLink',
  moduleEdit: 'editProductCategoryBrandLink',
  moduleDelete: 'deleteProductCategoryBrandLink',
  moduleGetList: 'getProductCategoryBrandLinkPageList',
  moduleGetDetail: 'getProductCategoryBrandLinkDetail',
  moduleName: '商品类型—品牌中间'
};

// 权限对象
const permissionObj = {
  id: 'ptm:productCategoryBrandLink',
  addBtn: 'ptm:productCategoryBrandLink:add',
  editBtn: 'ptm:productCategoryBrandLink:edit',
  deleteBtn: 'ptm:productCategoryBrandLink:delete'
};

export { columns, moduleConfig, permissionObj };
