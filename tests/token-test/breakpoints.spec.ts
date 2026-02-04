import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const url = new URL("./breakpoints.html", import.meta.url);
  await page.goto(url.href);
});

test("small breakpoint activates .bp-test at >= 768px", async ({ page }) => {

  // BELOW breakpoint
  await page.setViewportSize({ width: 500, height: 800 });
  let colour = await page.$eval("#bp", el => getComputedStyle(el).color);
  expect(colour).not.toBe("rgb(255, 0, 0)");

  // ABOVE breakpoint
  await page.setViewportSize({ width: 800, height: 800 });
  colour = await page.$eval("#bp", el => getComputedStyle(el).color);
  expect(colour).toBe("rgb(255, 0, 0)");
});
