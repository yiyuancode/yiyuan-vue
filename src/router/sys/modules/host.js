const host = {
  path: 'host',
  name: 'host',
  component: () => import('@/pages/sys/host/index.vue'),
  meta: {
    title: '主机管理',
    //一级菜单没有keepalive
    keepAlive: true,
    permissions: 'sys:host'
  }
}
export default host;
