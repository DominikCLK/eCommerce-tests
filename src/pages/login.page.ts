import { LoginUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = 'https://practicesoftwaretesting.com/#/auth/login';
  userEmailInput = this.page.locator('[data-test="email"]');
  userPasswordInput = this.page.locator('[data-test="password"]');
  loginButton = this.page.locator('[data-test="login-submit"]');

  constructor(page: Page) {
    super(page);
  }

  async login(loginUserData: LoginUserModel): Promise<void> {
    await this.userEmailInput.fill(loginUserData.userEmail);
    await this.userPasswordInput.fill(loginUserData.userPassword);

    const isButtonDisabled =
      (await this.loginButton.getAttribute('disabled')) === '';

    if (!isButtonDisabled) {
      await this.loginButton.click();
    }
  }
}
