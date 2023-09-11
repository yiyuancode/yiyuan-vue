const modulesFiles = require.context('./modules', true, /\/index\.js$/);
console.log('modulesFiles', modulesFiles);
const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules = {...modules, ...value.default.i18nMap};
  return modules;
}, {});
console.log('modulesI18nMap33333', modulesI18nMap);

const modulesI18nMapUS = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  console.log('modules2.value', value.default);
  value.default.i18nMapUS = value.default.i18nMapUS ? value.default.i18nMapUS : value.default.i18nMap
  modules = {...modules, ...value.default.i18nMapUS};
  return modules;
}, {});
console.log('modulesI18nMap222', modulesI18nMapUS);


module.exports = {
  messages: {
    CN: {
      home: {name: '首页'},
      ...modulesI18nMap
    },
    US: {
      home: {name: 'home'},
      ...modulesI18nMapUS
    },
    HK: {
      home: {name: '首頁'},
      dashboard: {
        name: 'Dashboard',
        workplace: {name: '工作台'}
      }
    }
  }
};
