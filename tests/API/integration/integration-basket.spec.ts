import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { API_URL } from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;

test.describe.configure({ mode: 'serial' });
test.describe('Get product details, add one product to basket then remove @API-integration', () => {
  const expectedResponseResult = 'item added or updated';

  let getProductResponse;
  let basketId;
  let productId;

  test('GET one product details', async ({ request }) => {
    // Arrange
    const productResponse = await request.get(
      buildUrl(APIEndpoints.PRODUCTS_ENDPOINT),
    );
    const responseProductJson = await productResponse.json();
    productId = responseProductJson.data[0].id;

    // Assert
    expect(productResponse.status()).toBe(200);
    expect(productId).toBeDefined();
    expect(productId).not.toBeNull();
  });

  test('POST create basket id', async ({ request }) => {
    // Act
    const basketResponse = await request.post(
      buildUrl(APIEndpoints.BASKET_ENDPOINT),
    );
    const responseBasketJson = await basketResponse.json();
    basketId = responseBasketJson.id;

    // Assert
    expect(basketResponse.status()).toBe(201);
    expect(basketId).toBeDefined();
    expect(basketId).not.toBeNull();
    expect(basketId).toBeTruthy();
  });

  test('POST add product to basket', async ({ request }) => {
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

    const addProductResponseJson = await addProductResponse.json();
    const responseMessage = addProductResponseJson.result;

    // Assert
    expect(addProductResponse.status()).toBe(200);
    expect(responseMessage).toBe(expectedResponseResult);
  });

  test('GET product in basket', async ({ request }) => {
    // Act
    getProductResponse = await request.get(
      `${buildUrl(APIEndpoints.BASKET_ENDPOINT)}/${basketId}`,
    );

    const getProductResponseJson = await getProductResponse.json();
    const productIdInBasket = getProductResponseJson.cart_items[0].product.id;

    // Assert
    expect(getProductResponse.status()).toBe(200);
    expect(productIdInBasket).toBe(productId);
  });

  test('DELETE remove product from basket', async ({ request }) => {
    // Act
    const removeProductResponse = await request.delete(
      `${buildUrl(APIEndpoints.BASKET_ENDPOINT)}/${basketId}/product/${productId}`,
    );

    // Assert
    expect(removeProductResponse.status()).toBe(204);
  });

  test('GET verify empty basket', async ({ request }) => {
    // Act
    getProductResponse = await request.get(
      `${buildUrl(APIEndpoints.BASKET_ENDPOINT)}/${basketId}`,
    );
    const emptyBasketJson = await getProductResponse.json();
    const cartItems = emptyBasketJson.cart_items;

    // Assert
    expect(getProductResponse.status()).toBe(200);
    expect(cartItems.length).toBe(0);
  });
});
