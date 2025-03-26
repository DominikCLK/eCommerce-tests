import { RegisterUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { LoginPage } from '@_src/pages/login.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = 'auth/register';

  firstNameInput = this.page.locator('[data-test="first-name"]');
  lastNameInput = this.page.locator('[data-test="last-name"]');
  birthDateInput = this.page.locator('[data-test="dob"]');
  streetInput = this.page.locator('[data-test="street"]');
  postCodeInput = this.page.locator('[data-test="postal_code"]');
  cityInput = this.page.locator('[data-test="city"]');
  stateInput = this.page.locator('[data-test="state"]');
  countrySelect = this.page.locator('[data-test="country"]');
  phoneInput = this.page.locator('[data-test="phone"]');
  emailInput = this.page.locator('[data-test="email"]');
  passwordInput = this.page.locator('[data-test="password"]');
  registerButton = this.page.locator('[data-test="register-submit"]');
  errorMessage = this.page.locator('[data-test="first-name-error"]');

  constructor(page: Page) {
    super(page);
  }

  async fillRegisterFields(
    registerUserData: RegisterUserModel,
  ): Promise<LoginPage> {
    await this.firstNameInput.fill(registerUserData.userFirstName);
    await this.lastNameInput.fill(registerUserData.userLastName);
    await this.birthDateInput.fill(registerUserData.userBirthDate);
    await this.streetInput.fill(registerUserData.userAddress);
    await this.postCodeInput.fill(registerUserData.userPostcode);
    await this.cityInput.fill(registerUserData.userCity);
    await this.stateInput.fill(registerUserData.userState);
    await this.countrySelect.selectOption('PL');
    await this.phoneInput.fill(registerUserData.userPhone);
    await this.emailInput.fill(registerUserData.userEmail);
    await this.passwordInput.fill(registerUserData.userPassword);

    return new LoginPage(this.page);
  }
}
