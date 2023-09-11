const routerMap = {
  admin: {
    name: "admin",
    component: () => import( '@/pages/auth/admin/index'),
  },
}
const i18nMap = {
  CN: {
    admin: {name: '用户管理'},
  },
  US: {
    admin: {name: 'User Management'},
  },
  HK: {
    admin: {name: '用戶管理'},
  }
}
export default {
  i18nMap,
  routerMap
};
