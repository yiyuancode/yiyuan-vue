const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

const plugins = [
  [
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]
];
if (IS_PROD) {
  plugins.push('transform-remove-console');
}
plugins.push("@babel/plugin-syntax-dynamic-import")
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', ["@babel/preset-env", {"modules": false}]],
  plugins
};
