import { Page } from '@playwright/test';

export class NavbarComponent {
  basket = this.page.locator('[data-test="nav-cart"]');

  constructor(private page: Page) {}
}
