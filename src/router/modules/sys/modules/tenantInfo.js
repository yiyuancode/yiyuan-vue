const routerMap = {
  tenantInfo: {
    name: '租户信息管理',
    component: () => import('@/pages/sys/tenantInfo/index')
  },
}
const i18nMap = {
  tenantInfo: {
    name: '租户信息管理'
  },
}
export default {
  i18nMap,
  routerMap
};
