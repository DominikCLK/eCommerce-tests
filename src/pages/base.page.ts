import { Page } from '@playwright/test';

export class BasePage {
  protected url = '';
  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyCurrentUrl(): Promise<void> {
    const currentUrl = this.page.url();

    if (!currentUrl.includes(this.url)) {
      throw new Error(
        `Expected URL containing: ${this.url}, Actual URL: ${currentUrl}`,
      );
    }
  }
}
