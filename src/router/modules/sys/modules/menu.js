const routerMap = {
  menu: {
    name: 'menu',
    component: () => import('@/pages/sys/menu/index')
  },
}


const i18nMap = {
  CN: {
    menu: {name: '菜单管理'},
  },
  US: {
    menu: {name: 'Menu Management'},
  },
  HK: {
    menu: {name: '選單管理'},
  }
}
export default {
  i18nMap,
  routerMap
};
