const product = {
  path: 'product',
  name: 'product',
  component: () => import('@/pages/ptm/product/index.vue'),
  meta: {
    title: '商品列表',
    //一级菜单没有keepalive
    keepAlive: true
    // permissions: 'sys:host'
  }
};
export default product;
