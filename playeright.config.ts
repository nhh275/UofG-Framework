import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
  

    globalSetup: "./playwright.setup.js",
  
    use: { headless: true },

    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox',  use: { browserName: 'firefox' } },
     { name: 'webkit',   use: { browserName: 'webkit' } }, // Safari engine
    ],
});