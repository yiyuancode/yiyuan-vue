const routerMap = {
  tenant: {
    name: 'tenant',
    component: () => import('@/pages/sys/tenant/index')
  },
}
const i18nMap = {
  CN: {
    tenant: {name: '商户管理'},
  },
  US: {
    tenant: {name: 'Merchant Management'},
  },
  HK: {
    tenant: {name: '商戶管理'},
  }
}
export default {
  i18nMap,
  routerMap
};
