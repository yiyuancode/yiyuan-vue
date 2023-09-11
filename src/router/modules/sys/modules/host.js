const routerMap = {
  host: {
    name: 'host',
    component: () => import('@/pages/sys/host/index')
  },
}
const i18nMap = {
  host: {
    name: '主机记录管理'
  },
}

const i18nMapUS = {
  host: {
    name: 'Host Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
