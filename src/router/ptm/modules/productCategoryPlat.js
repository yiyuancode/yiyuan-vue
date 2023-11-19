const productCategoryPlat = {
    path: 'productCategoryPlat',
        name: 'productCategoryPlat',
        component:() => import( '@/pages/ptm/productCategoryPlat/index.vue'),
        meta: {
        title: '平台商品分类',
            keepAlive: true,
            permissions: 'ptm:productCategoryPlat',
            sort: 0
    }
}
export default productCategoryPlat;
