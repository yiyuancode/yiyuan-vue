const productSku = {
        path: 'productSku',
        name: 'productSku',
        component:() => import( '@/pages/ptm/productSku/index.vue'),
    meta: {
    title: '商品sku管理',
        keepAlive: true,
        permissions: 'ptm:productSku',
        sort: 0
}
}
export default productSku;

