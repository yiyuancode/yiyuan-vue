const routerMap = {
  tenantInfo: {
    name: 'tenantInfo',
    component: () => import('@/pages/sys/tenantInfo/index')
  }
};
const i18nMap = {
  CN: {
    tenantInfo: {
      name: '租户信息'
    }
  },
  US: {
    tenantInfo: {
      name: 'Tenant Info'
    }
  },
  HK: {
    tenantInfo: {
      name: '租户信息'
    }
  }
};
export default {
  i18nMap,
  routerMap
};
