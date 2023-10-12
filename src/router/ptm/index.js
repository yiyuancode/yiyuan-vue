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
// 输出modules数组，其中包含了所有JS文件的内容

modules.sort((a, b) => {
  const sortA = a.meta.sort || 0;
  const sortB = b.meta.sort || 0;
  return sortB - sortA;
});


const ptm = {
  path: '/ptm',
  name: 'ptm',
  component: () => import('@/components/layout/Layout/index.vue'),
  //只有存放在meta信息里面的其他字段才能被this.$route获取到,不能和path平级
  meta: {
    title: '商品管理',
    permissions: 'ptm',
    sort: 1
  },
  children: modules
}
export default ptm;

