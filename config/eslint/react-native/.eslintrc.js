// See: https://github.com/facebook/react-native/blob/644fe430fdecc0bf1fa098d1c2d52178da6c987c/packages/eslint-config-react-native-community/index.js
module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
