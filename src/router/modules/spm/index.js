import {console} from "vuedraggable/src/util/helper";

const modulesFiles = require.context('./modules', true, /\.js$/);
console.log("modulesFiles222", modulesFiles)


const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  console.log('modules2.value', value.default);
  modules = {...modules, ...value.default.i18nMap};
  return modules;
}, {});
console.log('modulesI18nMap222', modulesI18nMap);

const modulesRouterMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  console.log('modules2.value', value);
  modules = {...modules, ...value.default.routerMap};
  return modules;
}, {});
console.log('modulesRouterMap222', modulesRouterMap);

const routerMap = {
  spm: {
    name: "店铺管理",
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
export default {
  i18nMap,
  routerMap
};
