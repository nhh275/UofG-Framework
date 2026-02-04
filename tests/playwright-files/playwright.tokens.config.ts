import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "../tests/token_test",
  globalSetup: "./playwright.setup.tokens.mjs",
});
