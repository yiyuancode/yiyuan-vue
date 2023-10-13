const productAttrKey = {
  path: 'productAttrKey',
  name: 'productAttrKey',
  component: () => import('@/pages/ptm/productAttrKey/index.vue'),
  meta: {
    title: '商品属性',
    //一级菜单没有keepalive
    keepAlive: true
    // permissions: 'sys:host'
  }
};
export default productAttrKey;
