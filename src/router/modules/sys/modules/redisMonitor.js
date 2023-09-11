const routerMap = {
  redisMonitor: {
    name: 'redisMonitor',
    component: () => import('@/pages/sys/redisMonitor/index'),
    invisible: true,
  },
}


const i18nMap = {
  CN: {
    redisMonitor: {name: 'Redis监控面板'},
  },
  US: {
    redisMonitor: {name: 'Redis Monitoring Panel'},
  },
  HK: {
    redisMonitor: {name: 'Redis監控面板'},
  }
}
export default {
  i18nMap,
  routerMap,
};
