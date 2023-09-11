
const modulesFiles = require.context('./modules', true, /\/index\.js$/);
const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  let i18nKeys = Object.keys(value.default.i18nMap);
  i18nKeys.forEach((im) => {
    if (!modules[im]) {
      modules[im] = {...value.default.i18nMap[im]}
    } else {
      modules[im] = {...modules[im], ...value.default.i18nMap[im]}
    }
  })
  return modules;
}, {});

module.exports = {
  messages: {
    CN: {
      home: {name: '首页'},
      ...modulesI18nMap.CN
    },
    US: {
      home: {name: 'home'},
      ...modulesI18nMap.US
    },
    HK: {
      home: {name: '首頁'},
      dashboard: {
        name: 'Dashboard',
        workplace: {name: '工作台'}
      },
      ...modulesI18nMap.HK
    }
  }
};
