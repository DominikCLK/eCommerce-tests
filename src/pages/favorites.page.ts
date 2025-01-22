import { BasePage } from '@_src/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class FavoritesPage extends BasePage {
  url = 'account/favorites';
  productName = this.page.locator(`//*[@data-test='product-name']`);
  productDescription = this.page.locator('[data-test="product-description"]');
  removeButton = this.page.locator('[data-test="delete"]');
  noFavDescription = this.page.getByText('There are no favorites yet.');

  getFavItem(id: string): Locator {
    return this.page.locator(`[data-test="favorite-${id}"]`);
  }

  constructor(page: Page) {
    super(page);
  }

  async removeFavorites(): Promise<void> {
    await this.removeButton.click();
  }
}
