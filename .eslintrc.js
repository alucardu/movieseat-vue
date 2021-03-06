module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'class-methods-use-this': 0,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    "@typescript-eslint/camelcase": ["error", { "properties": "never" } ],
    "no-param-reassign": ["error", { "props": false }],
  },
};
