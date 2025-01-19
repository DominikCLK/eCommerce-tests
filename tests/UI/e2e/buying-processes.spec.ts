import { expect, test } from '@_src/fixtures/merge.fixture';
import { API_URL } from 'config/env.config';

test.describe('Verify buying processes - products from home page', () => {
  test('Add product and chose Buy now pay later method @logged @e2e', async ({
    homePage,
    request,
    productDetails,
    checkoutPage,
  }) => {
    // Arrange
    const getProductData = async () => {
      const productsUrl = `${API_URL}/products?between=price,1,100&page=1`;
      const productResponse = await request.get(productsUrl);
      const { data } = await productResponse.json();
      return data[0];
    };

    const product = await getProductData();
    const successfulMessage = 'Payment was successful';

    // Act
    await homePage.goto();
    await homePage.productToBuy(product.id).click();

    // Assert
    await expect(productDetails.productName).toHaveText(product.name);
    await expect(productDetails.category).toHaveText(product.category.name);
    await expect(productDetails.brand).toHaveText(product.brand.name);
    await expect(productDetails.description).toHaveText(product.description);

    // Act
    await productDetails.addToBasketButton.click();
    await expect(productDetails.productAddedPopup).toBeInViewport();
    await productDetails.productAddedPopup.click();
    await productDetails.navbar.basket.click();

    // Assert
    await expect
      .soft(checkoutPage.checkoutItemName(product.name))
      .toBeVisible();

    // Act
    for (let step = 1; step <= 3; step++) {
      await checkoutPage.proceedButton(step.toString()).click();

      if (step === 3) {
        await checkoutPage.buyNowPayLaterMethod('3');
      }
    }

    // Assert
    await expect(checkoutPage.paymentMessage(successfulMessage)).toBeVisible();

    // Act
    await checkoutPage.confirmButton.click();

    // Assert
    await expect(checkoutPage.orderConfirmation).toBeVisible();
  });
});
