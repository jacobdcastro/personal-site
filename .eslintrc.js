module.exports = {
  extends: "standard",
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["error", "space"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "styled-components/rule-name": 2
  }
};
