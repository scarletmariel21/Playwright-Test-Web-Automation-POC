import { test, expect } from '@playwright/test';

let url : string = "https://www.saucedemo.com/inventory.html";


test('Access to TestPage', async ({ page }) => {
  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag/);
});

