const dept = {
  path: 'dept',
  name: 'dept',
  component: () => import('@/pages/sys/dept/index.vue'),
  meta: {
    title: '部门管理',
    //一级菜单没有keepalive
    keepAlive: true,
    permissions: 'sys:host'
  }
};
export default dept;
