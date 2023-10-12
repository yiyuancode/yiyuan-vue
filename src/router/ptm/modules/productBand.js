const productBand = {
  path: 'productBrand',
  name: 'productBrand',
  component: () => import('@/pages/ptm/productBrand/index.vue'),
  meta: {
    title: '品牌',
    //一级菜单没有keepalive
    keepAlive: true,
    sort: 1
    // permissions: 'sys:host'
  }
}
export default productBand;
