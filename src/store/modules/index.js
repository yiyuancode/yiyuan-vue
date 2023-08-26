const requireModule = require.context('@/store/modules', false, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.html') return;
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '');
  const moduleConfig = requireModule(fileName);
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default modules;
