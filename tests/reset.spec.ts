import { test, expect } from "@playwright/test";

test.describe("CSS Reset Tests", () => {

  test.beforeEach(async ({ page }) => {
    // Load the test page using absolute file path
      const fileUrl = new URL("./test-page.html", import.meta.url);
      await page.goto(fileUrl.toString());
  });

  test("global box-sizing is border-box", async ({ page }) => {
    const box = await page.$eval("body", el => getComputedStyle(el).boxSizing);
    expect(box).toBe("border-box");
  });

  test("headings have no margin", async ({ page }) => {
    const margin = await page.$eval("h1", el => getComputedStyle(el).marginTop);
    expect(margin).toBe("0px");
  });

  test("lists have no markers", async ({ page }) => {
    const style = await page.$eval("ul", el => getComputedStyle(el).listStyleType);
    expect(style).toBe("none");
  });

  test("images scale responsively", async ({ page }) => {
    const max = await page.$eval("img", el => getComputedStyle(el).maxWidth);
    expect(max).toBe("100%");
  });

  test("buttons inherit font", async ({ page }) => {
    const buttonFont = await page.$eval("button", el => getComputedStyle(el).fontFamily);
    const bodyFont = await page.$eval("body", el => getComputedStyle(el).fontFamily);
    expect(buttonFont).toBe(bodyFont);
  });

  test("textarea only resizes vertically", async ({ page }) => {
    const resize = await page.$eval("textarea", el => getComputedStyle(el).resize);
    expect(resize).toBe("vertical");
  });

  test("anchors have no underline", async ({ page }) => {
    const decoration = await page.$eval("a", el => getComputedStyle(el).textDecorationLine);
    expect(decoration).toBe("none");
  });
});
