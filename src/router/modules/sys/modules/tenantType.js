const routerMap = {
  tenantType: {
    name: 'tenantType',
    component: () => import('@/pages/sys/tenantType/index')
  },
}
const i18nMap = {
  tenantType: {
    name: '租户类型管理'
  },
}

const i18nMapUS = {
  tenantType: {
    name: 'TenantType Mange'
  },
}


export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
