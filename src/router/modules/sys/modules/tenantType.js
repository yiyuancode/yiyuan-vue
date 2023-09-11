const routerMap = {
  tenantType: {
    name: '租户类型管理',
    component: () => import('@/pages/sys/tenantType/index')
  },
}
const i18nMap = {
  tenantType: {
    name: '租户类型管理'
  },
}
export default {
  i18nMap,
  routerMap
};
