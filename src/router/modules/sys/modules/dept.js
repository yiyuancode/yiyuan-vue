const routerMap = {
  dept: {
    name: '部门管理',
    component: () => import('@/pages/sys/dept/index')
  },
}
const i18nMap = {
  dept: {
    name: '部门管理'
  },
}
export default {
  i18nMap,
  routerMap
};
