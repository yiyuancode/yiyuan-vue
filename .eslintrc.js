module.exports = {
  extends: [
    // 使用 eslint:recommended，推荐的 ESLint 规则
    'eslint:recommended',
    // 使用 plugin:vue/recommended，Vue.js 相关的推荐规则
    'plugin:vue/recommended',
    // 使用 prettier/vue，禁用与 Prettier 冲突的 ESLint 规则
    'prettier/vue',
    // 使用 prettier/@typescript-eslint，禁用与 Prettier 冲突的 TypeScript 规则
    'prettier/@typescript-eslint'
  ],
  parserOptions: {
    // 使用 babel-eslint 解析器，适配 Babel 解析
    parser: 'babel-eslint'
  },
  rules: {
    // 自定义规则
    "vue/require-default-prop" : "off", //是否都要给默认值
    "vue/require-prop-types" : "off",
    "vue/attribute-hyphenation" : "off"
  },
  env: {
    browser: true,
    es6: true
  },
  globals: {
    require: 'readonly',
    module: 'readonly',
    process: 'readonly',
    __dirname: 'readonly'
  }
};
