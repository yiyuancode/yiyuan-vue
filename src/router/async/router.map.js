
import {getRouterMapMerger} from '@/utils/routerAutoMerger.js'
const modulesFiles = require.context('../modules', true, /\/index\.js$/);
const {modulesRouterMap} = getRouterMapMerger(modulesFiles);

// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
};

// 路由组件注册
const routerMap = {
  exp404: {
    path: '*',
    name: '404',
    component: () => import('@/pages/exception/404')
  },
  exp403: {
    path: '/403',
    name: '403',
    component: () => import('@/pages/exception/403')
  },
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

  about: {
    name: "关于",
    component: () => import('@/pages/about/index.vue')
  },
  ...modulesRouterMap
};

export default routerMap;
