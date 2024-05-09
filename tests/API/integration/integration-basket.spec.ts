import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { parseResponseAndCheckStatus } from '@_src/utils/api.util';
import { API_URL } from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;

test.describe.configure({ mode: 'serial' });
test.describe('Get product details, add one product to basket then remove @API-integration', () => {
  const expectedResponseResult = 'item added or updated';

  let getProductResponse;
  let basketId;
  let productId;

  test('GET one product details @API-I-ECTS-R04-01', async ({ request }) => {
    // Arrange
    const productResponse = await request.get(
      buildUrl(APIEndpoints.PRODUCTS_ENDPOINT),
    );

    const responseProductJson = await parseResponseAndCheckStatus(
      productResponse,
      200,
    );
    productId = responseProductJson.data[0].id;

    // Assert
    expect(productId).toBeDefined();
    expect(productId).not.toBeNull();
  });

  test('POST create basket id @API-I-ECTS-R04-02', async ({ request }) => {
    // Act
    const basketResponse = await request.post(
      buildUrl(APIEndpoints.BASKET_ENDPOINT),
    );
    const responseBasketJson = await parseResponseAndCheckStatus(
      basketResponse,
      201,
    );
    basketId = responseBasketJson.id;

    // Assert
    expect(basketId).toBeDefined();
    expect(basketId).not.toBeNull();
    expect(basketId).toBeTruthy();
  });

  test('POST add product to basket @API-I-ECTS-R04-03', async ({ request }) => {
    // Act
    const addProductResponse = await request.post(
      `${buildUrl(APIEndpoints.BASKET_ENDPOINT)}/${basketId}`,
      {
        data: {
          product_id: productId,
          quantity: 1,
        },
      },
    );

    const addProductResponseJson = await parseResponseAndCheckStatus(
      addProductResponse,
      200,
    );
    const responseMessage = addProductResponseJson.result;

    // Assert
    expect(responseMessage).toBe(expectedResponseResult);
  });

  test('GET product in basket @API-I-ECTS-R04-04', async ({ request }) => {
    // Act
    getProductResponse = await request.get(
      `${buildUrl(APIEndpoints.BASKET_ENDPOINT)}/${basketId}`,
    );

    const getProductResponseJson = await parseResponseAndCheckStatus(
      getProductResponse,
      200,
    );
    const productIdInBasket = getProductResponseJson.cart_items[0].product.id;

    // Assert
    expect(productIdInBasket).toBe(productId);
  });

  test('DELETE remove product from basket @@API-I-ECTS-R04-05', async ({
    request,
  }) => {
    // Act
    const removeProductResponse = await request.delete(
      `${buildUrl(APIEndpoints.BASKET_ENDPOINT)}/${basketId}/product/${productId}`,
    );

    // Assert
    expect(removeProductResponse.status()).toBe(204);
  });

  test('GET verify empty basket @API-I-ECTS-R04-05', async ({ request }) => {
    // Act
    getProductResponse = await request.get(
      `${buildUrl(APIEndpoints.BASKET_ENDPOINT)}/${basketId}`,
    );
    const emptyBasketJson = await parseResponseAndCheckStatus(
      getProductResponse,
      200,
    );
    const cartItems = emptyBasketJson.cart_items;

    // Assert
    expect(cartItems.length).toBe(0);
  });
});
