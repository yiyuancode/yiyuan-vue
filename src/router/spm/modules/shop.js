const shop = {
  path: 'shop',
  name: 'shop',
  component: () => import('@/pages/spm/shop/index.vue'),
  meta: {
    title: '店铺管理',
    keepAlive: true,
    permissions: 'spm:shop',
    sort: 0
  }
};
export default shop;
