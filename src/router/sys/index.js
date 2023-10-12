// 获取modules文件夹下的所有JS文件
// const modulesContext = require.context('./modules', false, /\.js$/);
// 遍历所有JS文件，读取文件内容
// const modules = modulesContext.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//   const module = modulesContext(modulePath).default;
//   modules[moduleName] = module;
//   return modules;
// }, {});
// 获取modules文件夹下的所有JS文件
const modulesContext = require.context('./modules', false, /\.js$/);
// 读取所有JS文件的内容，并存储在一个数组中
const modules = modulesContext.keys().map(modulePath => modulesContext(modulePath).default);
// 输出modules数组，其中包含了所有JS文件的内容,并且排序 ，如果没有声明sort字段就放在最后
modules.sort((a, b) => {
  const sortA = a.meta.sort || 0;
  const sortB = b.meta.sort || 0;
  return sortB - sortA;
});


const sys = {
  path: '/sys',
  name: 'sys',
  component: () => import('@/components/layout/Layout/index.vue'),
  //只有存放在meta信息里面的其他字段才能被this.$route获取到,不能和path平级
  meta: {
    title: '系统管理',
    permissions: 'sys',
    sort: 2
  },
  children: modules
}
export default sys;

