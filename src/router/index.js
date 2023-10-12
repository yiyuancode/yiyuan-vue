import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import {console} from 'vuedraggable/src/util/helper';
// 引入依赖
// import autoRouter from 'vue-router-auto'

//修改router的跳转事件，取消报错提示。
const originalReplace = VueRouter.prototype.replace;
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// let autoRoutes = autoRouter({
//   // 页面级的.vue存放位置，必传
//   rc: require.context('@/pages', true, /\.vue$/),
//   // '/'的重定向，可选，默认为''
//   redirect: '/test',
//   // 页面级的.vue存放的文件夹，可选，默认为:views
//   rootFile: 'pages',
// })
// console.log("autoRoutes", autoRoutes)

Vue.use(VueRouter);
//静态路由，不需要做登录拦截的路由
const staticRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
    mate: {
      title: '登录'
    }
  }
];

//动态路由，需要做登录拦截的路由，并且可以用做菜单的渲染
export const dynamicRoutes = [
  {
    path: '/sys',
    name: 'sys',
    component: () => import('@/components/layout/Layout/index.vue'),
    //只有存放在meta信息里面的其他字段才能被this.$route获取到,不能和path平级
    meta: {
      title: '系统管理',
      permissions: 'sys'
    },
    children: [
      {
        path: 'dept',
        name: 'dept',
        component: () => import('@/pages/sys/dept/index.vue'),
        meta: {
          title: '部门管理',
          //一级菜单没有keepalive
          keepAlive: true,
          permissions: 'sys:host'
        }
      },
      {
        path: 'host',
        name: 'host',
        component: () => import('@/pages/sys/host/index.vue'),
        meta: {
          title: '主机管理',
          //一级菜单没有keepalive
          keepAlive: true,
          permissions: 'sys:host'
        }
      },
      {
        path: 'redis',
        name: 'redis',
        component: () => import('@/pages/sys/redis/index.vue'),
        meta: {
          title: 'redis管理',
          keepAlive: true,
          permissions: 'sys:redis'
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/pages/sys/user/index.vue'),
        meta: {
          title: '用户管理',
          keepAlive: true,
          permissions: 'sys:redis'
        }
      }
    ]
  },
  {
    path: '/ptm',
    name: 'pth',
    component: () => import('@/components/layout/Layout/index.vue'),
    //只有存放在meta信息里面的其他字段才能被this.$route获取到,不能和path平级
    meta: {
      title: '商品管理',
      permissions: 'ptm'
    },
    children: [
      {
        path: 'product',
        name: 'product',
        component: () => import('@/pages/ptm/product/index.vue'),
        meta: {
          title: '商品列表',
          //一级菜单没有keepalive
          keepAlive: true
          // permissions: 'sys:host'
        }
      },
      {
        path: 'productKey',
        name: 'productKey',
        component: () => import('@/pages/ptm/productAttrKey'),
        meta: {
          title: '商品属性',
          //一级菜单没有keepalive
          keepAlive: true
          // permissions: 'sys:host'
        }
      },
      {
        path: 'productValue',
        name: 'productValue',
        component: () => import('@/pages/ptm/productAttrValue/index.vue'),
        meta: {
          title: '商品属性值',
          //一级菜单没有keepalive
          keepAlive: true
          // permissions: 'sys:host'
        }
      },
      {
        path: 'productBand',
        name: 'productBand',
        component: () => import('@/pages/ptm/productBrand/index.vue'),
        meta: {
          title: '品牌',
          //一级菜单没有keepalive
          keepAlive: true
          // permissions: 'sys:host'
        }
      }
    ]
  }
];

// 递归生成 dynamicRoutesMap
function flattenRoutes(routes, result = {}) {
  routes.forEach((route) => {
    const {children, ...routeInfo} = route;
    result[routeInfo.name] = routeInfo;

    if (children && children.length > 0) {
      flattenRoutes(children, result);
    }
  });

  return result;
}

export const dynamicRoutesMap = flattenRoutes(dynamicRoutes);

console.log('dynamicRoutesMap', dynamicRoutesMap);

const router = new VueRouter({
  routes: [...staticRoutes, ...dynamicRoutes]
});
// router.addRoutes(dynamicRoutes)

router.beforeEach((to, from, next) => {
  // if (to.name.indexOf('login') == -1) {
  //   store.commit('addMyTags2', {
  //     name: to.name,
  //     path: to.path.split('/')[1],
  //     meta: to.meta
  //   });
  // }
  //跳转路由是否在黑名弹中，如果在，则需要判断是否已经登录
  if (dynamicRoutesMap[to.name]) {
    let myToken = localStorage.getItem('myToken');
    if (myToken) {
      store.commit('addMyTags2', {
        name: to.name,
        path: to.path.split('/')[1],
        meta: to.meta
      });
      next();
    } else {
      next('/login');
    }
  } else {
    //白名单随便跳转
    next();
  }
});
export default router;
