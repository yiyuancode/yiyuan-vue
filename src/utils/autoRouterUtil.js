export const gertRouterArray = function (context) {
  // 获取同级目录下所有满足条件的index.js文件
  // const context = context;
  // 存储满足条件的对象数组
  //动态路由，需要做登录拦截的路由，并且可以用做菜单的渲染
  let dynamic = context.keys().map((key) => context(key).default);
  //根绝sort字段升序排序
  dynamic.sort((a, b) => {
    const sortA = a.meta.sort || 0;
    const sortB = b.meta.sort || 0;
    return sortB - sortA;
  });
  return dynamic;
};

export const gertVuexStore = function (context) {
  const modules = {};
  context.keys().forEach((key) => {
    const fileName = key.replace(/\.\/(.+)\.js$/, '$1');
    const fileContent = context(key).default;
    modules[fileName] = fileContent;
  });
  console.log(modules);
  return modules;
};
