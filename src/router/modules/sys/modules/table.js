const routerMap = {
  table: {
    name: 'table',
    component: () => import('@/pages/sys/table/index')
  }
};
const i18nMap = {
  CN: {
    table: { name: '数据库管理' }
  },
  US: {
    table: { name: 'Database Management' }
  },
  HK: {
    table: { name: '資料庫管理' }
  }
};
export default {
  i18nMap,
  routerMap
};
