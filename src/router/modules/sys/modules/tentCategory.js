const routerMap = {
  tenantCategory: {
    name: 'tenantCategory',
    component: () => import('@/pages/sys/tenantCategory/index')
  }
};
const i18nMap = {
  CN: {
    tenantCategory: {
      name: '租户类目'
    }
  },
  US: {
    tenantCategory: {
      name: 'tenantCategory'
    }
  },
  HK: {
    tenantCategory: {
      name: '租户类目'
    }
  }
};
export default {
  i18nMap,
  routerMap
};
