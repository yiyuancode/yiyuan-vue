const routerMap = {
  qrtz: {
    name: '定时任务管理',
    component: () => import('@/pages/sys/qrtz/index')
  },
}
const i18nMap = {
  qrtz: {
    name: '定时任务管理'
  },
}
export default {
  i18nMap,
  routerMap
};
