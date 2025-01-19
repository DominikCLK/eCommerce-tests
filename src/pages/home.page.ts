import { BasePage } from '@_src/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '';
  banner = this.page.getByRole('img', { name: 'Banner' });
  navbarLogo = this.page.getByRole('link', {
    name: 'Practice Software Testing -',
  });
  overview = this.page.locator('app-overview');

  constructor(page: Page) {
    super(page);
  }

  productToBuy(id: string): Locator {
    return this.page.locator(`[data-test="product-${id}"]`);
  }
}
