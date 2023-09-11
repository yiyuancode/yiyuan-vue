const routerMap = {
  qrtz: {
    name: 'qrtz',
    component: () => import('@/pages/sys/qrtz/index')
  },
}


const i18nMap = {
  CN: {
    qrtz: {name: '定时任务管理'},
  },
  US: {
    qrtz: {name: 'Scheduled Tsk Mnagement'},
  },
  HK: {
    qrtz: {name: '定時任務管理'},
  }
}
export default {
  i18nMap,
  routerMap,
};
