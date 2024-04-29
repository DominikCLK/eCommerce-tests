import { expect, test } from '@_src/fixtures/merge.fixture';
import { API_URL } from 'config/env.config';

test.describe('Verify buying processes - products from home page', () => {
  test('Add product and chose Buy now pay later method @logged', async ({
    homePage,
    request,
    productDetails,
    checkoutPage,
  }) => {
    // Arrange
    const productsUrl = `${API_URL}/products?between=price,1,100&page=1`;
    const productResponse = await request.get(productsUrl);
    const responseProductJson = await productResponse.json();
    const successfulMessage = 'Payment was successful';

    const {
      id: productId,
      name: productName,
      category: { name: productCategory },
      brand: { name: productBrand },
      description: productDescription,
    } = responseProductJson.data[0];

    // Act
    await homePage.goto();
    await homePage.productToBuy(productId).click();

    // Assert
    await expect(productDetails.productName).toHaveText(productName);
    await expect(productDetails.category).toHaveText(productCategory);
    await expect(productDetails.brand).toHaveText(productBrand);
    await expect(productDetails.description).toHaveText(productDescription);

    // Act
    await productDetails.addToBasketButton.click();
    await expect(productDetails.productAddedPopup).toBeInViewport();
    await productDetails.navbar.basket.click();

    // Assert
    await expect(checkoutPage.checkoutItemName(productName)).toBeVisible();

    // Act
    await checkoutPage.proceedButton('1').click();
    await checkoutPage.proceedButton('2').click();

    // Assert
    await expect(checkoutPage.checkoutAddress).toBeInViewport();
    await expect(checkoutPage.checkoutCity).toBeInViewport();
    await expect(checkoutPage.checkoutState).toBeInViewport();
    await expect(checkoutPage.checkoutCountry).toBeInViewport();
    await expect(checkoutPage.checkoutPostcode).toBeInViewport();

    // Act
    await checkoutPage.proceedButton('3').click();
    await checkoutPage.buyNowPayLaterMethod('3 monthly installments');

    // Assert
    await checkoutPage.paymentMessage(successfulMessage);
  });
});
