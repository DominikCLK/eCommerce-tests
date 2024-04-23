import { RegisterUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { LoginPage } from '@_src/pages/login.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
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

  async register(registerUserData: RegisterUserModel): Promise<LoginPage> {
    await this.firstNameInput.fill(registerUserData.userFirstName);
    await this.lastNameInput.fill(registerUserData.userLastName);
    await this.birthDateInput.fill('2000-02-21');
    await this.addressInput.fill(registerUserData.userAddress);
    await this.postCodeInput.fill(registerUserData.userPostcode);
    await this.cityInput.fill(registerUserData.userCity);
    await this.stateInput.fill(registerUserData.userState);
    await this.countrySelect.selectOption('PL');
    await this.phoneInput.fill('123456789');
    await this.emailInput.fill(registerUserData.userEmail);
    await this.passwordInput.fill(registerUserData.userPassword);

    await this.registerButton.click();

    return new LoginPage(this.page);
  }
}
