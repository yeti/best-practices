module.exports = {
  env: {
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  globals: {},
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "camelcase": 0,
    "default-case": 2,
    "interface-name": 0,
    "object-literal-sort-keys": 0,
    "ordered-imports": 0,
    quotemark: 0,
    "no-console": 0,
    "no-undef": 0,
    "no-var": 2,
    "@typescript-eslint/indent": [2, 2],
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-empty-function": 0,
    radix: 0,
  },
  settings: {},
};