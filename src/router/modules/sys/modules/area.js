const routerMap = {
  area: {
    name: 'area',
    component: () => import('@/pages/sys/area/index')
  }
};
const i18nMap = {
  CN: {
    area: {
      name: '区域管理'
    }
  },
  US: {
    area: {
      name: 'Area Management'
    }
  },
  HK: {
    area: {
      name: '区域管理'
    }
  }
};
export default {
  i18nMap,
  routerMap
};
