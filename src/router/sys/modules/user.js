const user = {
  path: 'user',
  name: 'user',
  component: () => import('@/pages/sys/user/index.vue'),
  meta: {
    title: '用户管理',
    keepAlive: true,
    permissions: 'sys:redis',
    sort: 2
  }
}
export default user;
