import { expect, test } from '@_src/fixtures/merge.fixture';
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from '@config/env.config';

test.describe('Verify login @smoke-ui', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Verify successful login as default user', async ({
    loginPage,
    page,
    accountPage,
  }) => {
    // Arrange
    const expectedTitle =
      'Overview - Practice Software Testing - Toolshop - v5.0';
    const loggedHeading = 'My account';

    // Act
    await loginPage.loginAsDefault(DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD);

    // // Assert
    await expect(page).toHaveTitle(expectedTitle);
    await expect(accountPage.myAccountTitle).toBeVisible();
    await expect(accountPage.myAccountTitle).toContainText(loggedHeading);
  });

  test('Verify unsuccessful login with incorrect details', async ({
    loginPage,
    page,
  }) => {
    // Arrange
    const expectedTitle = 'Login - Practice Software Testing - Toolshop - v5.0';
    const expectedErrorMessage = 'Invalid email or password';

    // Act
    await loginPage.loginAsDefault('testemail@test.com', 'incorrectPassword');

    // // Assert
    await expect(page).toHaveTitle(expectedTitle);
    await expect(loginPage.loginErrorMessage).toBeVisible();
    await expect(loginPage.loginErrorMessage).toContainText(
      expectedErrorMessage,
    );
  });
});
