import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const url = new URL("./spacing.html", import.meta.url);
  await page.goto(url.href);
});

test("space6 token outputs correct spacing", async ({ page }) => {
  const mt = await page.$eval("#spacing-test", el =>
    getComputedStyle(el).marginTop
  );

  // space6 = 1.5rem x 16px (default browser size) = 24px
  expect(mt).toBe("24px");
});
