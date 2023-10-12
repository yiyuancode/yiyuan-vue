const redis = {
  path: 'redis',
  name: 'redis',
  component: () => import('@/pages/sys/redis/index.vue'),
  meta: {
    title: 'redis管理',
    keepAlive: true,
    permissions: 'sys:redis'
  }
}
export default redis;
