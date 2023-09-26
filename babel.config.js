const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

const plugins = [];
if (IS_PROD) {
  plugins.push('transform-remove-console');
}
plugins.push("@babel/plugin-syntax-dynamic-import")
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
};
