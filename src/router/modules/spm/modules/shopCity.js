const routerMap = {
  shopCity: {
    name: "shopCity",
    component: () => import( '@/pages/spm/shopCity/index'),
  },
}
const i18nMap = {
  CN: {
    shopCity: {name: '店铺区域管理'},
  },
  US: {
    shopCity: {name: 'Store Area Management'},
  },
  HK: {
    shopCity: {name: '店鋪區域管理'},
  }
}
export default {
  i18nMap,
  routerMap
};
