module.exports = {
  '*.{js,jsx,vue}': [
    'eslint --fix', // 使用 ESLint 检查和修复 JavaScript、Vue 文件
    'prettier --write', // 使用 Prettier 格式化文件
    'git add' // 添加文件到 Git 提交
  ],
  '*.{css,scss,less}': [
    'stylelint --fix', // 使用 Stylelint 检查和修复样式文件
    'prettier --write', // 使用 Prettier 格式化文件
    'git add' // 添加文件到 Git 提交
  ]
};
