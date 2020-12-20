import { it, expect } from "@playwright/test";

it("is a basic test with the page", async ({ page }) => {
  //const browser = await playwright[browserType].launch({ headless: false });
  //const context = await browser.newContext()
  //const page = await context.newPage()
  await page.goto("https://playwright.dev/");
  const name = await page.innerText(".home-navigation");
  expect(name).toBe("🎭 Playwright");
});