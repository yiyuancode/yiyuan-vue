const routerMap = {
  hostMonitor: {
    name: 'hostMonitor',
    component: () => import('@/pages/sys/hostMonitor/index'),
    invisible: true,
  },
}

const i18nMap = {
  CN: {
    hostMonitor: {name: '服务器监控面板'},
  },
  US: {
    hostMonitor: {name: 'Server Monitoring Panel'},
  },
  HK: {
    hostMonitor: {name: '伺服器監控面板'},
  }
}
export default {
  i18nMap,
  routerMap,
};
