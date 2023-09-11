const routerMap = {
  tenantInfo: {
    name: 'tenantInfo',
    component: () => import('@/pages/sys/tenantInfo/index')
  },
}
const i18nMap = {
  tenantInfo: {
    name: '租户信息管理'
  },
}

const i18nMapUS = {
  tenantInfo: {
    name: 'TenantInfo Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
