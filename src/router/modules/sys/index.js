import {console} from "vuedraggable/src/util/helper";

const modulesFiles2 = require.context('./modules', true, /\.js$/);
console.log("modulesFiles2", modulesFiles2)


const modulesI18nMap = modulesFiles2.keys().reduce((modules, modulePath) => {
  const value = modulesFiles2(modulePath);
  console.log('modules2.value', value.default);
  modules = {...modules, ...value.default.i18nMap};
  return modules;
}, {});
console.log('modulesI18nMap222', modulesI18nMap);

const routerMap = {
  sys: {
    name: '系统管理',
    component: () => import('@/layouts/BlankView')
  },
}


const i18nMap = {
  sys: {
    name: '系统管理',
  }
}
export default {
  i18nMap,
  routerMap
};
