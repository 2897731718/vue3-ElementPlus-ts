module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ["@typescript-eslint", "prettier"], // 注册插件
  extends: [
    // 打开这个插件提供的规则
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.vue"],
    },
  ],
  rules: {
    // js/ts
    // 'no-console': ['warn', { allow: ['error'] }],
    "prettier/prettier": "error", // 打开这个插件提供的规则，它在 ESLint 中运行 Prettier
    "arrow-body-style": "off", // 关闭两个不幸与这个插件有问题的 ESLint 核心规则
    "prefer-arrow-callback": "off",
  },
};
