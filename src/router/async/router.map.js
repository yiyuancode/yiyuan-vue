import { console } from 'vuedraggable/src/util/helper';

const modulesFiles = require.context('../modules', true, /\.js$/);
const modulesI18nMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  console.log('modules2.value', value);
  modules = { ...modules, ...value.default.i18nMap };
  return modules;
}, {});
console.log('modulesI18nMap', modulesI18nMap);

const modulesRouterMap = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  console.log('modules2.value', value);
  modules = { ...modules, ...value.default.routerMap };
  return modules;
}, {});
console.log('modulesRouterMap', modulesRouterMap);
// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
};

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login/index')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/login',
    component: view.tabs
  },
  dashboard: {
    name: 'Dashboard',
    component: view.blank
  },
  workplace: {
    name: '工作台',
    component: () => import('@/pages/dashboard/workplace/index')
  },

  role: {
    name: '角色管理',
    component: () => import('@/pages/auth/role/index')
  },
  auth: {
    name: '权限管理',
    component: view.blank,
    icon: 'security-scan'
  },
  admin: {
    name: '用户管理',
    component: () => import('@/pages/auth/admin/index')
  },

  ...modulesRouterMap
};

export default routerMap;
