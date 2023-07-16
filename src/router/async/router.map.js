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
    component: view.blank
  },
  role: {
    path: "/sys/role",
    name: "角色管理",
    component: () => import('@/pages/sys/role/index'),
  },
  user: {
    path: "/sys/user",
    name: "用户管理",
    component: () => import('@/pages/sys/user/index'),
  },
  tenant: {
    name: "租户管理",
    component: view.blank
  },
  tenantList: {
    name: "租户列表",
    path: "/sys/tenant/list",
    component: () => import('@/pages/sys/tenant/tenantList/index'),
  },
  tenantPackage: {
    name: "租户列表",
    path: "/sys/tenant/package",
    component: () => import('@/pages/sys/tenant/tenantPackage/index'),
  },
  menu: {
    name: "菜单管理",
    path: "/sys/menu",
    component: () => import('@/pages/sys/menu/index'),
  }
};
export default routerMap;
