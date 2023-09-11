const routerMap = {
  redis: {
    name: 'redis',
    component: () => import('@/pages/sys/redis/index')
  }
};
const i18nMap = {
  CN: {
    redis: { name: 'Redis管理' }
  },
  US: {
    redis: { name: 'Redis Management' }
  },
  HK: {
    redis: { name: 'Redis管理' }
  }
};

export default {
  i18nMap,
  routerMap
};
