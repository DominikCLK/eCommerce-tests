import { prepareUserDataForUi } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe.configure({ mode: 'parallel' });
test.describe('Verify register @smoke-ui', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test('Verify successful registration', async ({
    registerPage,
    loginPage,
    page,
  }) => {
    // Arrange:
    const registerUserData = prepareUserDataForUi();
    const expectedWelcomeTitle = 'Practice Software Testing - Toolshop - v5.0';

    // Act:
    await registerPage.fillRegisterFields(registerUserData);
    await registerPage.registerButton.click();

    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginHeading).toBeVisible();
    await expect(registerPage.getTitle()).resolves.toContain(
      expectedWelcomeTitle,
    );

    // Assert:
    await expect.soft(loginPage.registerLink).toBeVisible();
    await expect.soft(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('Verify validation for required fields @UI-S-ECTS-R01-03', async ({
    registerPage,
  }) => {
    // Arrange:
    const registerUserData = prepareUserDataForUi();
    const expectedErrorMessage = 'First name is required';

    // Act:
    await registerPage.fillRegisterFields(registerUserData);
    await registerPage.firstNameInput.clear();
    await registerPage.lastNameInput.clear();
    await registerPage.registerButton.click();

    // Assert:
    await expect(registerPage.errorMessage).toHaveText(expectedErrorMessage);
  });
});
