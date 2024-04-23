import { LoginPage } from '@_src/pages/login.page';
import { RegisterPage } from '@_src/pages/register.page';
import { test as baseTest } from '@playwright/test';

const pageObjectTest = baseTest.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export default pageObjectTest;
export const expect = pageObjectTest.expect;
