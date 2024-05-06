import { expect } from '@playwright/test';

export async function parseResponseAndCheckStatus(
  response,
  expectedStatus: number,
): Promise<any> {
  const jsonResponse = await response.json();
  expect(response.status()).toBe(expectedStatus);
  return jsonResponse;
}
