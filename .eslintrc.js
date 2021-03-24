module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "plugin:vue/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
  },
  rules: {},
};
