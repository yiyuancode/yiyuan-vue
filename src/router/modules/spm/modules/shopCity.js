const routerMap = {
  shopCity: {
    name: "shopCity",
    component: () => import( '@/pages/spm/shopCity/index'),
  },
}
const i18nMap = {
  shopCity:
    {
      name: "城市区域管理"
    }
  ,
}
const i18nMapUS = {
  shopCity: {
    name: 'ShopCity Mange'
  },
}
export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
