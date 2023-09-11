const routerMap = {
  menu: {
    name: 'menu',
    component: () => import('@/pages/sys/menu/index')
  },
}
const i18nMap = {
  menu: {
    name: '菜单管理'
  },
}


const i18nMapUS = {
  menu: {
    name: 'Menu Mange'
  },
}
export default {
  i18nMap,
  routerMap,
  i18nMapUS
};
