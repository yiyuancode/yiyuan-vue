const routerMap = {
  log: {
    component: () => import('@/components/iframe/Iframe'),
    props: {
      src: 'http://106.54.87.159:50007/app/kibana#/discover'
    }
  },
}
const i18nMap = {
  log: {
    name: '日志管理'
  },
}
export default {
  i18nMap,
  routerMap
};
