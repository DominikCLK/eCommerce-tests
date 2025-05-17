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
    await page.unroute(`${API_URL}/products/${productId}`);
  });

  test('Check if product details are invisible if code 404', async ({
    page,
    productDetails,
  }) => {
    // Arrange
    await page.route(`${API_URL}/products/${productId}`, async (route) => {
      await route.fulfill({
        status: 404,
        body: JSON.stringify({ error: 'Product not found' }),
      });
    });

    // Act
    await navigateToProductPage(page, productId);

    // Assert
    await productDetails.verifyAllLocatorsAreHidden();
  });

  test('Check if related products are invisible if code 404', async ({
    page,
    productDetails,
  }) => {
    // Arrange
    await page.route(
      `${API_URL}/products/${productId}/related`,
      async (route) => {
        await route.fulfill({
          status: 404,
          body: JSON.stringify({ error: 'Products not found' }),
        });
      },
    );

    // Act
    await navigateToProductPage(page, productId);

    // Assert
    await expect(productDetails.relatedProducts).not.toBeVisible();
  });
});