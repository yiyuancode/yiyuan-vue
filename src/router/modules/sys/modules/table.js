const routerMap = {
  table: {
    name: '数据库管理',
    component: () => import('@/pages/sys/table/index')
  },
}
const i18nMap = {
  table: {
    name: '数据库管理'
  },
}
export default {
  i18nMap,
  routerMap
};
