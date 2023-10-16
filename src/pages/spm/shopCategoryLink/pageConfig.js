/**
 * 店铺-主营类目关联页面组件配置配置
 *
 * @author  一源-spring
 * @date 2023-10-16
 */
import * as shopCategoryLink from '@/api/spm/shopCategoryLink';

const columns = [
  {
    title: '店铺id',
    dataIndex: 'spmShopId',
    key: 'spmShopId',
    width: 160
  },

  {
    title: '主营类目id(商品分类的一级)',
    dataIndex: 'ptmProductCategoryId',
    key: 'ptmProductCategoryId',
    width: 160
  }
];

// 模块配置
const moduleConfig = {
  module: shopCategoryLink,
  moduleAdd: 'addShopCategoryLink',
  moduleEdit: 'editShopCategoryLink',
  moduleDelete: 'deleteShopCategoryLink',
  moduleGetList: 'getShopCategoryLinkPageList',
  moduleGetDetail: 'getShopCategoryLinkDetail',
  moduleName: '店铺-主营类目关联'
};

// 权限对象
const permissionObj = {
  id: 'spm:shopCategoryLink',
  addBtn: 'spm:shopCategoryLink:add',
  editBtn: 'spm:shopCategoryLink:edit',
  deleteBtn: 'spm:shopCategoryLink:delete'
};

export { columns, moduleConfig, permissionObj };
