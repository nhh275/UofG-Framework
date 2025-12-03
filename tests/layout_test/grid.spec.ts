import { test, expect } from "@playwright/test";

test.describe("Grid Layout Tests", () => {
  test.beforeEach(async ({ page }) => {
    const url = new URL("./grid.html", import.meta.url);
    await page.goto(url.href);
  });

  // -----------------------
  // 1. Container padding
  // -----------------------
  test("container has non-zero horizontal padding", async ({ page }) => {
    const padLeft = await page.$eval(".container", el =>
      getComputedStyle(el).paddingLeft
    );
    const padRight = await page.$eval(".container", el =>
      getComputedStyle(el).paddingRight
    );

    const left = parseFloat(padLeft);
    const right = parseFloat(padRight);

    expect(left).toBeGreaterThan(0);
    expect(right).toBeGreaterThan(0);
    // Optional: rough check it's around 24px (+/- a bit)
    expect(left).toBeGreaterThan(10);
    expect(left).toBeLessThan(40);
  });

  // -----------------------
  // 2. col-6 ≈ 50% width
  // -----------------------
  test("col-6 takes about half the row width", async ({ page }) => {
    const width = await page.$eval("#col-test", el =>
      parseFloat(getComputedStyle(el).width)
    );
    const parentWidth = await page.$eval(".row", el =>
      parseFloat(getComputedStyle(el).width)
    );

    // Avoid NaN issues
    expect(Number.isFinite(width)).toBe(true);
    expect(Number.isFinite(parentWidth)).toBe(true);

    const ratio = width / parentWidth;
    // Allow some tolerance (45–55%)
    expect(ratio).toBeGreaterThan(0.4);
    expect(ratio).toBeLessThan(0.6);
  });

  // ---------------------------------------------
  // 3. Responsive test: col-sm-6 at 768px viewport
  // ---------------------------------------------
  test("col-small-6 takes about half the row at >=768px", async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });

    const width = await page.$eval("#col-small-test", el =>
      parseFloat(getComputedStyle(el).width)
    );
    const parentWidth = await page.$eval(".row", el =>
      parseFloat(getComputedStyle(el).width)
    );

    expect(Number.isFinite(width)).toBe(true);
    expect(Number.isFinite(parentWidth)).toBe(true);

    const ratio = width / parentWidth;
    expect(ratio).toBeGreaterThan(0.4);
    expect(ratio).toBeLessThan(0.6);
  });

  // -----------------------
  // 4. Offset tests
  // -----------------------
  test("offset-3 shifts column to the right", async ({ page }) => {
    const marginLeft = await page.$eval("#offset-test", el =>
      getComputedStyle(el).marginLeft
    );
    const ml = parseFloat(marginLeft);

    const parent = await page.$eval(".row", el =>
      parseFloat(getComputedStyle(el).width)
    );

    expect(Number.isFinite(ml)).toBe(true);
    expect(ml).toBeGreaterThan(0); // definitely shifted

    const ratio = ml / parent;
    // Should be roughly a quarter of the row (3/12 = 0.25)
    expect(ratio).toBeGreaterThan(0.15);
    expect(ratio).toBeLessThan(0.35);
  });

  // -----------------------
  // 5. Order classes (basic sanity)
  // -----------------------
  test("default order is 0 for grid items", async ({ page }) => {
    const order = await page.$eval("#offset-test", el =>
      getComputedStyle(el).order
    );

    // Default flex item order
    expect(order).toBe("0");
  });

  // -----------------------
  // 6. Clearfix pseudo element
  // -----------------------
  test("clearfix has a non-empty ::after pseudo element", async ({ page }) => {
    const display = await page.$eval(".clearfix", el =>
      getComputedStyle(el, ":after").display
    );
    const content = await page.$eval(".clearfix", el =>
      getComputedStyle(el, ":after").content
    );

    // Browser differences: we just assert it's NOT the plain default inline/none
    expect(display).not.toBe("inline"); // default
    expect(content).not.toBe("none");
    expect(content).not.toBe("normal");
  });
});
