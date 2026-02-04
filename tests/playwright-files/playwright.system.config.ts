import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "../tests/system_test",
  globalSetup: "./playwright.setup.main.mjs",
});
