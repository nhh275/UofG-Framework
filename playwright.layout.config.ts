import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/layout_test",
  fullyParallel: false,

  reporter: [["list"]],
  
  use: {
    headless: true,
  },

  globalSetup: "./playwright.setup.layout.mjs",
});
