import {getRouterMerger} from '@/utils/routerAutoMerger.js'
const modulesFiles = require.context('./modules', true, /\.js$/);
const {modulesI18nMap, modulesRouterMap} = getRouterMerger(modulesFiles);


const routerMap = {
  sys: {
    name: 'sys',
    component: () => import('@/layouts/BlankView')
  },
  ...modulesRouterMap
}

const i18nMap = {
  CN: {
    sys: {
      name: '系统管理',
      ...modulesI18nMap.CN

    },
  },
  US: {
    sys: {
      name: 'System Management',
      ...modulesI18nMap.US
    },
  },
  HK: {
    sys: {
      name: '系統管理',
      ...modulesI18nMap.HK
    },
  }
}
export default {
  i18nMap,
  routerMap
};
