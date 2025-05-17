import { NavbarComponent } from '@_src/components/navbar.component';
import { BasePage } from '@_src/pages/base.page';
import { Page, expect } from '@playwright/test';

export class ProductDetails extends BasePage {
  productName = this.page.locator('[data-test="product-name"]');
  category = this.page.getByLabel('category');
  brand = this.page.getByLabel('brand');
  price = this.page.locator('[data-test="unit-price"]');
  description = this.page.locator('[data-test="product-description"]');
  addToBasketButton = this.page.locator('[data-test="add-to-cart"]');
  addToFavButton = this.page.locator('[data-test="add-to-favorites"]');
  unauthorizedPopup = this.page.getByText('Unauthorized, can not add');
  productAddedPopup = this.page.getByText('Product added to shopping cart.');
  productAddedToFavPopup = this.page.getByText(
    'Product added to your favorites list. ',
  );
  quantity = this.page.locator('[data-test="quantity"]');
  addToCartButton = this.page.locator('button[data-test="add-to-cart"]');
  increaseQuantityButton = this.page.locator(
    'button[data-test="increase-quantity"]',
  );
  outOfStock = this.page.locator('p[data-test="out-of-stock"]');
  durationElement = this.page.locator('#duration');
  relatedProducts = this.page.locator('.col .container');

  navbar = new NavbarComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async addToFavorites(): Promise<void> {
    await this.addToFavButton.click();
  }

  loadLocators = [
    this.productName,
    this.category,
    this.brand,
    this.price,
    this.description,
    this.addToBasketButton,
    this.addToFavButton,
    this.quantity,
    this.addToCartButton,
    this.increaseQuantityButton,
  ];

  async verifyAllLocatorsAreHidden(): Promise<void> {
    await Promise.all(
      this.loadLocators.map((locator) => expect(locator).not.toBeVisible()),
    );
  }
}