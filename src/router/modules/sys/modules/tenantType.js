const routerMap = {
  tenantType: {
    name: 'tenantType',
    component: () => import('@/pages/sys/tenantType/index')
  }
};
const i18nMap = {
  CN: {
    tenantType: {
      name: '租户类型'
    }
  },
  US: {
    tenantType: {
      name: 'TenantType'
    }
  },
  HK: {
    tenantType: {
      name: '租户类型'
    }
  }
};
export default {
  i18nMap,
  routerMap
};
