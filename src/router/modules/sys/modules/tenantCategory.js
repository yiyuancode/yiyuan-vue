const routerMap = {
  tenantCategory: {
    name: 'tenantCategory',
    component: () => import('@/pages/sys/tenantCategory/index')
  },
}
const i18nMap = {
  tenantCategory: {
    name: '租户店铺分类'
  },
}

const i18nMapUS = {
  tenantCategory: {
    name: 'TenantCategory Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
