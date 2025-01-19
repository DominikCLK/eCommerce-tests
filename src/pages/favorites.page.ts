import { BasePage } from '@_src/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class FavoritesPage extends BasePage {
  url = 'account/favorites';
  productName = this.page.locator(`//*[@data-test='product-name']`);

  getFavItem(id: string): Locator {
    return this.page.locator(`[data-test="favorite-${id}"]`);
  }

  constructor(page: Page) {
    super(page);
  }
}
