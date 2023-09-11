const routerMap = {
  tenantCategory: {
    name: '租户店铺分类',
    component: () => import('@/pages/sys/tenantCategory/index')
  },
}
const i18nMap = {
  tenantCategory: {
    name: '租户店铺分类'
  },
}
export default {
  i18nMap,
  routerMap
};
