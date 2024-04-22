import { LoginPage } from '@_src/pages/login.page';
import { test as baseTest } from '@playwright/test';

const pageObjectTest = baseTest.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await use(loginPage);
  },
});

export default pageObjectTest;
export const expect = pageObjectTest.expect;
