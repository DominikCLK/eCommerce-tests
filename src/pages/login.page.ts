import { RegisterUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = 'https://practicesoftwaretesting.com/#/auth/login';
  userEmailInput = this.page.locator('[data-test="email"]');
  userPasswordInput = this.page.locator('[data-test="password"]');
  loginButton = this.page.locator('[data-test="login-submit"]');
  loginHeading = this.page.getByRole('heading', { name: 'Login' });
  registerLink = this.page.locator('[data-test="register-link"]');
  forgotPasswordLink = this.page.locator('[data-test="forgot-password-link"]');

  constructor(page: Page) {
    super(page);
  }

  async login(registerUserData: RegisterUserModel): Promise<void> {
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userPasswordInput.fill(registerUserData.userPassword);

    const isButtonDisabled =
      (await this.loginButton.getAttribute('disabled')) === '';

    if (!isButtonDisabled) {
      await this.loginButton.click();
    }
  }
}
