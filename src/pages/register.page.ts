import { LoginUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = 'https://practicesoftwaretesting.com/#/auth/register';

  firstNameInput = this.page.locator('[data-test="first-name"]');
  lastNameInput = this.page.locator('[data-test="last-name"]');
  birthDateInput = this.page.locator('[data-test="dob"]');
  addressInput = this.page.locator('[data-test="address"]');
  postCodeInput = this.page.locator('[data-test="postcode"]');
  cityInput = this.page.locator('[data-test="city"]');
  stateInput = this.page.locator('[data-test="state"]');
  countrySelect = this.page.locator('[data-test="country"]');
  phoneInput = this.page.locator('[data-test="phone"]');
  emailInput = this.page.locator('[data-test="email"]');
  passwordInput = this.page.locator('[data-test="password"]');
  registerButton = this.page.locator('[data-test="register-submit"]');

  constructor(page: Page) {
    super(page);
  }
}
