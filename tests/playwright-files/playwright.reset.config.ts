import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: '../tests/reset_test',
  

    globalSetup: "./playwright.setup.reset.mjs",
  
    use: { headless: true },

    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox',  use: { browserName: 'firefox' } },
     { name: 'webkit',   use: { browserName: 'webkit' } }, // Safari engine
    ],
});