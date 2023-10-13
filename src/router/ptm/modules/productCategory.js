const productCategory = {
        path: 'productCategory',
        name: 'productCategory',
        component:() => import( '@/pages/ptm/productCategory/index.vue'),
    meta: {
    title: '商品分类管理',
        keepAlive: true,
        permissions: 'ptm:productCategory',
        sort: 0
}
}
export default productCategory;

