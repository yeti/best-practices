module.exports = {
  env: {
    es6: true,
    browser: "true",
    "jest/globals": true
  },
  extends: [
    "plugin:styled-components-a11y/recommended",
    "plugin:prettier/recommended",
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "cypress"
  ],
  globals: {},
  plugins: ["react", "react-hooks", "@emotion", "jest"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-props-no-spreading": 0,
    "react/destructuring-assignment": [2, "always"],
    "react/no-deprecated": 2,
    "react/no-unsafe": 2,
    "react/no-unused-state": 2,
    "react/jsx-pascal-case": 2,
    "react/react-in-jsx-scope": 0,
    "react-hooks/exhaustive-deps": 0,
    "@emotion/syntax-preference": [2, "object"],
    "jsx-a11y/no-static-element-interactions": 0,
    "react/require-default-props": "off",
    "no-nested-ternary": "off",
    "prettier/prettier": 1,
  },
  settings: {},
  parserOptions: {
    tsconfigRootDir: __dirname
  }
}
