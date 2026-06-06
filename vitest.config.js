const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    globals: true,
    exclude: ["_site/**", "node_modules/**"],
  },
});
