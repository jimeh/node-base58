module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  parserOptions: {
    "ecmaVersion": 6
  }
};
