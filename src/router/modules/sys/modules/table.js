const routerMap = {
  table: {
    name: 'table',
    component: () => import('@/pages/sys/table/index')
  },
}
const i18nMap = {
  table: {
    name: '数据库管理'
  },
}

const i18nMapUS = {
  table: {
    name: 'Table Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
