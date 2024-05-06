import { expect, test } from '@_src/fixtures/merge.fixture';
import { API_URL } from 'config/env.config';

test.describe.configure({ mode: 'serial' });
test.describe('Get product details, add one product to basket then remove @API-integration', () => {
  const productsUrl = `${API_URL}/products?between=price,1,100&page=1`;
  const createBasketUrl = `${API_URL}/carts`;
  const expectedResponseResult = 'item added or updated';

  let getProductResponse;
  let basketId;
  let productId;

  test('GET one product details', async ({ request }) => {
    // Arrange
    const productResponse = await request.get(productsUrl);
    const responseProductJson = await productResponse.json();
    productId = responseProductJson.data[0].id;

    // Assert
    expect(productResponse.status()).toBe(200);
    expect(productId).toBeDefined();
    expect(productId).not.toBeNull();
  });

  test('POST create basket id', async ({ request }) => {
    // Act
    const basketResponse = await request.post(createBasketUrl);
    const responseBasketJson = await basketResponse.json();
    basketId = responseBasketJson.id;

    // Assert
    expect(basketResponse.status()).toBe(201);
    expect(basketId).toBeDefined();
    expect(basketId).not.toBeNull();
    expect(basketId).toBeTruthy();
  });

  test('POST add product to basket', async ({ request }) => {
    // Arrange
    const addProductResponse = await request.post(
      `${createBasketUrl}/${basketId}`,
      {
        data: {
          product_id: productId,
          quantity: 1,
        },
      },
    );

    // Act
    const addProductResponseJson = await addProductResponse.json();
    const responseMessage = addProductResponseJson.result;

    // Assert
    expect(addProductResponse.status()).toBe(200);
    expect(responseMessage).toBe(expectedResponseResult);
  });

  test('GET product in basket', async ({ request }) => {
    // Act
    getProductResponse = await request.get(`${createBasketUrl}/${basketId}`);

    const getProductResponseJson = await getProductResponse.json();
    const productIdInBasket = getProductResponseJson.cart_items[0].product.id;

    // Assert
    expect(getProductResponse.status()).toBe(200);
    expect(productIdInBasket).toBe(productId);
  });

  test('DELETE remove product from basket', async ({ request }) => {
    // Act
    const removeProductResponse = await request.delete(
      `${createBasketUrl}/${basketId}/product/${productId}`,
    );

    // Assert
    expect(removeProductResponse.status()).toBe(204);
  });

  test('GET verify empty basket', async ({ request }) => {
    // Act
    getProductResponse = await request.get(`${createBasketUrl}/${basketId}`);
    const emptyBasketJson = await getProductResponse.json();
    const cartItems = emptyBasketJson.cart_items;

    // Assert
    expect(getProductResponse.status()).toBe(200);
    expect(cartItems.length).toBe(0);
  });
});
