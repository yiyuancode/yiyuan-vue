const productAttrValue = {
  path: 'productAttrValue',
  name: 'productAttrValue',
  component: () => import('@/pages/ptm/productAttrValue/index.vue'),
  meta: {
    title: '商品属性值',
    //一级菜单没有keepalive
    keepAlive: true
    // permissions: 'sys:host'
  }
};
export default productAttrValue;
