import { expect, test } from '@_src/fixtures/merge.fixture';
import { getProductData } from '@_src/utils/api.util';

test.describe('Verify adding to favorites processes - products from home page', () => {
  test('Add product to favorite and verify if product is there then remove product from list @logged @e2e', async ({
    homePage,
    request,
    productDetails,
    favoritesPage,
  }): Promise<void> => {
    // Arrange:
    const product = await getProductData(request);

    // Act:
    await homePage.goto();
    await homePage.productToBuy(product.id).click();

    // Assert:
    await expect(productDetails.productName).toHaveText(product.name);
    await expect(productDetails.category).toHaveText(product.category.name);
    await expect(productDetails.brand).toHaveText(product.brand.name);
    await expect(productDetails.description).toHaveText(product.description);

    // Act:
    await productDetails.addToFavorites();

    // Assert:
    await expect(productDetails.productAddedToFavPopup).toBeVisible();

    // Act:
    await favoritesPage.goto();

    // Assert:

    await expect(favoritesPage.productName).toHaveText(product.name);

    // Act:
    await favoritesPage.removeFavorites();

    // Assert:
    await expect(favoritesPage.getFavItem(product.id)).not.toBeVisible();
    await expect(favoritesPage.noFavDescription).toBeVisible();
  });
});
