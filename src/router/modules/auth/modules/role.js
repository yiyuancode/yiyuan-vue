const routerMap = {
  role: {
    name: 'role',
    component: () => import('@/pages/auth/role/index')
  }
};
const i18nMap = {
  CN: {
    role: { name: '角色管理' }
  },
  US: {
    role: { name: 'Role Management' }
  },
  HK: {
    role: { name: '角色管理' }
  }
};
export default {
  i18nMap,
  routerMap
};
