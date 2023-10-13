const activitiy = {
  path: 'activitiy',
  name: 'activitiy',
  component: () => import('@/pages/mam/activitiy/index.vue'),
  meta: {
    title: '营销活动管理',
    keepAlive: true,
    permissions: 'mam:activitiy',
    sort: 0
  }
};
export default activitiy;
