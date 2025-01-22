import { Product } from '@_src/models/products.model';
import { expect } from '@playwright/test';
import { API_URL } from 'config/env.config';

export async function parseResponseAndCheckStatus(
  response,
  expectedStatus: number,
): Promise<any> {
  const jsonResponse = await response.json();
  expect(response.status()).toBe(expectedStatus);
  return jsonResponse;
}

export async function getProductData(request): Promise<Product> {
  const productsUrl = `${API_URL}/products?between=price,1,100&page=1`;
  const productResponse = await request.get(productsUrl);
  if (!productResponse.ok()) {
    throw new Error('Failed to fetch product data');
  }
  const { data } = await productResponse.json();
  if (!data || !data.length) {
    throw new Error('No products found');
  }
  return data[0];
}
