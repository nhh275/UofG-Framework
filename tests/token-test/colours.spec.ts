import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const url = new URL("./colours.html", import.meta.url);
  await page.goto(url.href);
});

test("uni-blue token outputs correct value", async ({ page }) => {
  const colour = await page.$eval("#test-colour", el =>
    getComputedStyle(el).color
  );

  // #003865 → rgb(0, 56, 101)
  expect(colour).toBe("rgb(0, 56, 101)");
});
