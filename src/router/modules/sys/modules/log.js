const routerMap = {
  log: {
    name: 'log',
    component: () => import('@/components/iframe/Iframe'),
    props: {
      src: 'http://106.54.87.159:50007/app/kibana#/discover'
    }
  }
};

const i18nMap = {
  CN: {
    log: { name: '日志管理' }
  },
  US: {
    log: { name: 'Log Management' }
  },
  HK: {
    log: { name: '日誌管理' }
  }
};
export default {
  i18nMap,
  routerMap
};
