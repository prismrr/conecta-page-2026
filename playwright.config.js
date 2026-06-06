const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true,
  },
  webServer: {
    command: "npm run build:site && npx http-server _site -p 4173 -s",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
