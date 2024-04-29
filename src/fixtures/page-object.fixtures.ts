import { CheckoutPage } from '@_src/pages/checkout.page';
import { HomePage } from '@_src/pages/home.page';
import { LoginPage } from '@_src/pages/login.page';
import { ProductDetails } from '@_src/pages/product-details.page';
import { RegisterPage } from '@_src/pages/register.page';
import { test as baseTest } from '@playwright/test';

const pageObjectTest = baseTest.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  productDetails: ProductDetails;
  checkoutPage: CheckoutPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productDetails: async ({ page }, use) => {
    const productDetails = new ProductDetails(page);
    await use(productDetails);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export default pageObjectTest;
export const expect = pageObjectTest.expect;
