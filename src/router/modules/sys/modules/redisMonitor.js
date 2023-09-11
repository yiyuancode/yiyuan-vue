const routerMap = {
  redisMonitor: {
    name: 'redisMonitor',
    component: () => import('@/pages/sys/redisMonitor/index'),
    invisible: true,
  },
}
const i18nMap = {
  redisMonitor: {
    name: 'Redis监控面板'
  },
}

const i18nMapUS = {
  redisMonitor: {
    name: 'RedisMonitor Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
