import { getRouterMerger } from '@/utils/routerAutoMerger.js';
const modulesFiles = require.context('./modules', true, /\.js$/);
const { modulesI18nMap, modulesRouterMap } = getRouterMerger(modulesFiles);

const routerMap = {
  spm: {
    name: 'spm',
    component: () => import('@/layouts/BlankView')
  },
  ...modulesRouterMap
};

const i18nMap = {
  CN: {
    spm: {
      name: '店铺区域管理',
      ...modulesI18nMap.CN
    }
  },
  US: {
    spm: {
      name: 'Store Management',
      ...modulesI18nMap.US
    }
  },
  HK: {
    spm: {
      name: '店鋪管理',
      ...modulesI18nMap.HK
    }
  }
};

export default {
  i18nMap,
  routerMap
};
