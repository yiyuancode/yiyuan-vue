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
    component: () => import('@/pages/dashboard/workplace/index'),
  },
  sys: {
    name: "系统管理",
    component: view.blank,
    icon : "setting"
  },
  role: {
    name: "角色管理",
    component: () => import('@/pages/auth/role/index'),
  },
  auth : {
    name : "权限管理",
    component: view.blank,
    icon: "security-scan",
  },
  admin: {
    name: "用户管理",
    // component: () => import('@/pages/auth/admin/index'),
  },
  // redis :{
  //   component: () => import('@/pages/sys/redis/index'),
  // },
  tenant: {
    name: "租户管理",
    component: () => import('@/pages/sys/tenant/index'),
  },
  hostMonitor:{
    // component: () => import('@/pages/sys/hostMonitor/index'),
  },
  menu: {
    name: "菜单管理",
    component: () => import('@/pages/sys/menu/index'),
  },
  host:{
    name : "主机记录管理",
    component: () => import('@/pages/sys/host/index'),
  },
  // qrtz : {
  //   component: () => import('@/pages/sys/qrtz/index'),
  // },
};

export default routerMap;
