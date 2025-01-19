import { expect, test } from '@_src/fixtures/merge.fixture';
import { API_URL } from 'config/env.config';

test.describe('Verify adding to favorites processes - products from home page', () => {
  test('Add product to favorite and verify if product is there @logged @e2e', async ({
    homePage,
    request,
    productDetails,
    favoritesPage,
  }) => {
    // Arrange
    const getProductData = async () => {
      const productsUrl = `${API_URL}/products?between=price,1,100&page=1`;
      const productResponse = await request.get(productsUrl);
      const { data } = await productResponse.json();
      return data[0];
    };

    const product = await getProductData();

    // Act
    await homePage.goto();
    await homePage.productToBuy(product.id).click();

    // Assert
    await expect(productDetails.productName).toHaveText(product.name);
    await expect(productDetails.category).toHaveText(product.category.name);
    await expect(productDetails.brand).toHaveText(product.brand.name);
    await expect(productDetails.description).toHaveText(product.description);

    // Act
    await productDetails.addToFavorites();

    // Assert
    await expect(productDetails.productAddedToFavPopup).toBeVisible();

    // Act
    await favoritesPage.goto();

    // Assert
    await expect(favoritesPage.getFavItem(product.id)).toBeVisible();
    await expect(favoritesPage.productName).toHaveText(product.name);
  });
});
