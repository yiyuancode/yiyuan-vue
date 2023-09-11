import {console} from "vuedraggable/src/util/helper";

const modulesFiles = require.context('./modules', true, /\.js$/);
console.log("modulesFiles222", modulesFiles)


const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules = {...modules, ...value.default.i18nMap};
  return modules;
}, {});


const modulesI18nMapUS = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  //如果没配置英文,则用中文代替
  value.default.i18nMapUS = value.default.i18nMapUS ? value.default.i18nMapUS : value.default.i18nMap
  modules = {...modules, ...value.default.i18nMapUS};
  return modules;
}, {});


const modulesRouterMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules = {...modules, ...value.default.routerMap};
  return modules;
}, {});

const routerMap = {
  spm: {
    name: "spm",
    component: () => import( '@/layouts/BlankView'),
  },
  ...modulesRouterMap
}


const i18nMap = {
  spm: {
    name: "店铺管理",
    ...modulesI18nMap
  }
}


const i18nMapUS = {
  spm: {
    name: 'Shop Mange',
    ...modulesI18nMapUS
  }
}
export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
