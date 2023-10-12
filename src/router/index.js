import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';


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
//

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


// 获取同级目录下所有满足条件的index.js文件
const context = require.context('./', true, /\/([^/]+)\/index\.js$/);
// 存储满足条件的对象数组
//动态路由，需要做登录拦截的路由，并且可以用做菜单的渲染
let dynamic = context.keys().map(key => context(key).default);
//根绝sort字段升序排序
dynamic.sort((a, b) => {
  const sortA = a.meta.sort || 0;
  const sortB = b.meta.sort || 0;
  return sortB - sortA;
});

export const dynamicRoutes = dynamic;

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


const router = new VueRouter({
  routes: [...staticRoutes, ...dynamicRoutes]
});
// router.addRoutes(dynamicRoutes)

router.beforeEach((to, from, next) => {
  //跳转路由是否在黑名弹中，如果在，则需要判断是否已经登录
  if (dynamicRoutesMap[to.name]) {
    let myToken = localStorage.getItem('myToken');
    if (myToken) {
      next();
      if (!store.getters['tags/hasTagsName'](to.name)) {
        store.dispatch("tags/add", {name: to.name, meta: to.meta})
      } else {
        //不能把to全部塞进去,因为有些属性事箭头函数 json转化不了 会报错
        store.dispatch("tags/change", {name: to.name, meta: to.meta})
      }

    } else {
      next('/login');
    }
  } else {
    //白名单随便跳转
    next();
  }
});
export default router;
