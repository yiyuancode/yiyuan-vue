const routerMap = {
  tenant: {
    name: '租户管理',
    component: () => import('@/pages/sys/tenant/index')
  },
}
const i18nMap = {
  tenant: {
    name: '租户管理'
  },
}
export default {
  i18nMap,
  routerMap
};
