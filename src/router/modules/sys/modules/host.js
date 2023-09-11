const routerMap = {
  host: {
    name: 'host',
    component: () => import('@/pages/sys/host/index')
  }
};
const i18nMap = {
  CN: {
    host: { name: '主机管理' }
  },
  US: {
    host: { name: 'Host Management' }
  },
  HK: {
    host: { name: '主機管理' }
  }
};

export default {
  i18nMap,
  routerMap
};
