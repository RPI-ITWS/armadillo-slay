module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint","node"],
  extends: [
      "eslint:recommended",
      "plugin:node/recommended",
      "plugin:@typescript-eslint/recommended"
  ],
  rules: {
      "import/no-commonjs": "off",
      "node/no-unsupported-features/es-syntax": "off"
  },
};
