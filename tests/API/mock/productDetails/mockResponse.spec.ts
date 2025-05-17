import { expect, test } from '@_src/fixtures/merge.fixture';
import { getProductData, mockProductResponse } from '@_src/utils/api.util';
import { API_URL, BASE_URL } from 'config/env.config';

const navigateToProductPage = async (page, productId: string) => {
  await page.goto(`${BASE_URL}/product/${productId}`);
};

test.describe('Mock product details page', () => {
  let productId: string;

  test.beforeEach(async ({ request }) => {
    const product = await getProductData(request);
    productId = product.id;
  });

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

  test('Check if out of stock info is visible', async ({
    page,
    productDetails,
  }) => {
    // Arrange
    await page.route(`${API_URL}/products/${productId}`, (route) =>
      mockProductResponse(route, { in_stock: false }),
    );

    // Act
    await navigateToProductPage(page, productId);

    // Assert
    await expect(productDetails.outOfStock).toBeVisible();
    await expect(productDetails.addToCartButton).toBeDisabled();
    await expect(productDetails.increaseQuantityButton).toBeDisabled();
  });

  test('Check if rental option is available', async ({
    page,
    productDetails,
  }) => {
    // Arrange
    await page.route(`${API_URL}/products/${productId}`, (route) =>
      mockProductResponse(route, { is_rental: true }),
    );

    // Act
    await navigateToProductPage(page, productId);

    // Assert
    await expect(productDetails.durationElement).toBeVisible();
    await expect(productDetails.durationElement).toBeEnabled();
    await expect(productDetails.increaseQuantityButton).toBeHidden();
  });

  test('Check if description is hidden when undefined', async ({
    page,
    productDetails,
  }) => {
    // Arrange
    await page.route(`${API_URL}/products/${productId}`, (route) =>
      mockProductResponse(route, { description: undefined }),
    );

    // Act
    await navigateToProductPage(page, productId);

    // Assert
    await expect(productDetails.description).toBeHidden();
    await page.unrouteAll({ behavior: 'ignoreErrors' });
  });

  test('Check if brand and category value is not visible when id is invalid', async ({
    page,
    productDetails,
  }) => {
    // Arrange
    await page.route(`${API_URL}/products/${productId}`, (route) =>
      mockProductResponse(route, { category: { id: '1' }, brand: { id: '1' } }),
    );

    // Act
    await navigateToProductPage(page, productId);

    // Assert
    await expect(productDetails.brand).not.toHaveText('ForgeFlex Tools');
    await expect(productDetails.category).not.toHaveText('PliersForgeFlex');
  });
});