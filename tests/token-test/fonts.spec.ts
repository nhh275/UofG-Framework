import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const url = new URL("./fonts.html", import.meta.url);
  await page.goto(url.href);
});

test("primary font family token is applied", async ({ page }) => {
  const font = await page.$eval("#font-test", el =>
    getComputedStyle(el).fontFamily
  );

  expect(font.toLowerCase()).toContain("swiss721");
});
