const routerMap = {
  redisMonitor: {
    name: 'Redis监控面板',
    component: () => import('@/pages/sys/redisMonitor/index'),
    invisible: true,
  },
}
const i18nMap = {
  redisMonitor: {
    name: 'Redis监控面板'
  },
}
export default {
  i18nMap,
  routerMap
};
