import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';
import { NavbarComponent } from '@_src/components/navbar.component';


export class ProductDetails extends BasePage {
  productName = this.page.locator('[data-test="product-name"]');
  category = this.page.getByLabel('category');
  brand = this.page.getByLabel('brand');
  price = this.page.locator('[data-test="unit-price"]');
  description = this.page.locator('[data-test="product-description"]');
  addToBasketButton = this.page.locator('[data-test="add-to-cart"]');
  addToFavButton = this.page.locator('[data-test="add-to-favorites"]');
  unauthorizedPopup = this.page.getByText('Unauthorized, can not add');
  productAddedPopup = this.page.getByText('Product added to shopping');
  quantity = this.page.locator('[data-test="quantity"]');

  navbar = new NavbarComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
