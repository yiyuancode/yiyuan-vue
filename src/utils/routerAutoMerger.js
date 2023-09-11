export const getRouterMerger = (modulesFiles) => {
  const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    let i18nKeys = Object.keys(value.default.i18nMap);
    i18nKeys.forEach((im) => {
      let moundlsKeys = Object.keys(value.default.i18nMap[im]);
      moundlsKeys.forEach((im2) => {
        if (!modules[im]) {
          modules[im] = { ...value.default.i18nMap[im] };
        } else {
          modules[im][im2] = {
            ...modules[im][im2],
            ...value.default.i18nMap[im][im2]
          };
        }
      });
    });
    return modules;
  }, {});

  const modulesRouterMap = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    modules = { ...modules, ...value.default.routerMap };
    return modules;
  }, {});
  return {
    modulesI18nMap,
    modulesRouterMap
  };
};

export const getRouterMapMerger = (modulesFiles) => {
  const modulesRouterMap = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    modules = { ...modules, ...value.default.routerMap };
    return modules;
  }, {});
  return {
    modulesRouterMap
  };
};

export const getRouterI18nMerger = (modulesFiles) => {
  const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    let i18nKeys = Object.keys(value.default.i18nMap);
    i18nKeys.forEach((im) => {
      if (!modules[im]) {
        modules[im] = { ...value.default.i18nMap[im] };
      } else {
        modules[im] = { ...modules[im], ...value.default.i18nMap[im] };
      }
    });
    return modules;
  }, {});
  return {
    modulesI18nMap
  };
};
