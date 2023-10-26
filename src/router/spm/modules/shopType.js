const shopType = {
  path: 'shopType',
  name: 'shopType',
  component: () => import('@/pages/spm/shopType/index.vue'),
  meta: {
    title: '店铺类型管理',
    keepAlive: true,
    permissions: 'spm:shopType',
    sort: 0
  }
};
export default shopType;
