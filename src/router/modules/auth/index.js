import {getRouterMerger} from '@/utils/routerAutoMerger.js'

const modulesFiles = require.context('./modules', true, /\.js$/);
const {modulesI18nMap, modulesRouterMap} = getRouterMerger(modulesFiles);

const routerMap = {
  auth: {
    name: "auth",
    component: () => import( '@/layouts/BlankView'),
  },
  ...modulesRouterMap
}

const i18nMap = {
  CN: {
    auth: {
      name: '权限管理',
      ...modulesI18nMap.CN

    },
  },
  US: {
    auth: {
      name: 'Permission Management',
      ...modulesI18nMap.US
    },
  },
  HK: {
    auth: {
      name: '許可權管理',
      ...modulesI18nMap.HK
    },
  }
}


export default {
  i18nMap,
  routerMap
};
