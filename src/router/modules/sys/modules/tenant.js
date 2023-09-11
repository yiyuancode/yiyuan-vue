const routerMap = {
  tenant: {
    name: 'tenant',
    component: () => import('@/pages/sys/tenant/index')
  },
}
const i18nMap = {
  tenant: {
    name: '商户管理'
  },
}

const i18nMapUS = {
  tenant: {
    name: 'Tenant Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
