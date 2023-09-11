const routerMap = {
  hostMonitor: {
    name: '服务器监控面板',
    component: () => import('@/pages/sys/hostMonitor/index'),
    invisible: true,
  },
}
const i18nMap = {
  hostMonitor: {
    name: '服务器监控面板'
  },
}
export default {
  i18nMap,
  routerMap
};
