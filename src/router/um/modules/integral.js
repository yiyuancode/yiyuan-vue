const integral = {
  path: 'integral',
  name: 'integral',
  component: () => import('@/pages/um/integral/index.vue'),
  meta: {
    title: '积分管理',
    keepAlive: true,
    permissions: 'um:integral',
    sort: 0
  }
};
export default integral;
