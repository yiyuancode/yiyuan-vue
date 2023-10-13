const activitiyProduct = {
  path: 'activitiyProduct',
  name: 'activitiyProduct',
  component: () => import('@/pages/mam/activitiyProduct/index.vue'),
  meta: {
    title: '活动商品管理',
    keepAlive: true,
    permissions: 'mam:activitiyProduct',
    sort: 0
  }
};
export default activitiyProduct;
