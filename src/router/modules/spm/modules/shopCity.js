const routerMap = {
  shopCity: {
    name: "城市区域管理",
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
export default {
  i18nMap,
  routerMap
};
