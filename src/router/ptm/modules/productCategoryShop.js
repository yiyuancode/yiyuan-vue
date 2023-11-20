const productCategoryShop = {
    path: 'productCategoryShop',
        name: 'productCategoryShop',
        component:() => import( '@/pages/ptm/productCategoryShop/index.vue'),
        meta: {
        title: '店铺商品分类',
            keepAlive: true,
            permissions: 'ptm:productCategoryShop',
            sort: 0
    }
}
export default productCategoryShop;
