import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
export { expect } from '@playwright/test';

type Pages = {
  page: Page;
  loginPage: LoginPage;
};

export const test = base.extend<Pages>({

loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }

});

base.afterEach(async ({ page }) => {
  await page.close();
});


