const freightTempPrice = {
  path: 'freightTempPrice',
  name: 'freightTempPrice',
  component: () => import('@/pages/ftm/freightTempPrice/index.vue'),
  meta: {
    title: '物流模板价格管理',
    keepAlive: true,
    permissions: 'ftm:freightTempPrice',
    sort: 0
  }
};
export default freightTempPrice;
