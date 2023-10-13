const activitiyProductSku = {
  path: 'activitiyProductSku',
  name: 'activitiyProductSku',
  component: () => import('@/pages/mam/activitiyProductSku/index.vue'),
  meta: {
    title: '活动商品sku管理',
    keepAlive: true,
    permissions: 'mam:activitiyProductSku',
    sort: 0
  }
};
export default activitiyProductSku;
