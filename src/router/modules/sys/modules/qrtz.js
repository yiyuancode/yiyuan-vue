const routerMap = {
  qrtz: {
    name: 'qrtz',
    component: () => import('@/pages/sys/qrtz/index')
  },
}
const i18nMap = {
  qrtz: {
    name: '定时任务管理'
  },
}

const i18nMapUS = {
  qrtz: {
    name: 'Menu Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
