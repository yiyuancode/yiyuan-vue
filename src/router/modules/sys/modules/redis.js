const routerMap = {
  redis: {
    name: 'redis',
    component: () => import('@/pages/sys/redis/index')
  },
}
const i18nMap = {
  redis: {
    name: 'Redis管理'
  },
}

const i18nMapUS = {
  redis: {
    name: 'Redis Mange'
  },
}

export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
