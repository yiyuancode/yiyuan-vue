const routerMap = {
  host: {
    name: '主机记录管理',
    component: () => import('@/pages/sys/host/index')
  },
}
const i18nMap = {
  host: {
    name: '主机记录管理'
  },
}
export default {
  i18nMap,
  routerMap
};
