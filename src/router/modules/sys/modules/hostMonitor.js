const routerMap = {
  hostMonitor: {
    name: 'hostMonitor',
    component: () => import('@/pages/sys/hostMonitor/index'),
    invisible: true,
  },
}
const i18nMap = {
  hostMonitor: {
    name: '服务器监控面板'
  },
}
const i18nMapUS = {
  hostMonitor: {
    name: 'HostMonitor Mange'
  },
}
export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
