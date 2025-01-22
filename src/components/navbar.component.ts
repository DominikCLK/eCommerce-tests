import { Locator, Page } from '@playwright/test';

export class NavbarComponent {
  getNavbarTab(navbarTab: string): Locator {
    return this.page.locator(`[data-test="nav-${navbarTab}"]`);
  }

  basket = this.page.locator('[data-test="nav-cart"]');
  categoriesTab = this.getNavbarTab('categories');

  constructor(private page: Page) {}

  async selectTab(navbarTab: string): Promise<void> {
    await this.getNavbarTab(navbarTab).click();
  }
  async selectCategoriesTab(categories: string): Promise<void> {
    await this.categoriesTab.click();
    await this.getNavbarTab(categories).click();
  }
}
