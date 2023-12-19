const productGuarantee = {
  path: 'productGuarantee',
  name: 'productGuarantee',
  component: () => import('@/pages/ptm/productGuarantee/index.vue'),
  meta: {
    title: '保障服务管理',
    keepAlive: true,
    permissions: 'ptm:productGuarantee',
    sort: 0
  }
};
export default productGuarantee;
