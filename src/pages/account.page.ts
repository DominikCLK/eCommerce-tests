import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class AccountPage extends BasePage {
  url = 'account';
  myAccountTitle = this.page.locator(`//*[@data-test='page-title']`);

  constructor(page: Page) {
    super(page);
  }
}
