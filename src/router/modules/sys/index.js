const modulesFiles = require.context('./modules', true, /\.js$/);

const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  let i18nKeys = Object.keys(value.default.i18nMap);
  i18nKeys.forEach((im) => {
    let moundlsKeys = Object.keys(value.default.i18nMap[im]);
    moundlsKeys.forEach((im2) => {
      if (!modules[im]) {
        modules[im] = {...value.default.i18nMap[im]}
      } else {
        modules[im][im2] = {...modules[im][im2], ...value.default.i18nMap[im][im2]}
      }
    })
  })
  return modules;
}, {});

const modulesRouterMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules = {...modules, ...value.default.routerMap};
  return modules;
}, {});

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
