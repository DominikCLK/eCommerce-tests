import { prepareUserDataForUi } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe.configure({ mode: 'parallel' });
test.describe('Verify register @smoke-UI', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test('Verify that users can successfully register account @UI-S-ECTS-R01-01 @UI-S-ECTS-R01-02', async ({
    registerPage,
    loginPage,
    page,
  }) => {
    // Arrange
    const registerUserData = prepareUserDataForUi();
    const expectedWelcomeTitle = 'Practice Software Testing - Toolshop - v5.0';

    // Act
    await registerPage.fillRegisterFields(registerUserData);
    await registerPage.registerButton.click();
    const title = await registerPage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginHeading).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('Verify that users cant login with incorrect data @UI-S-ECTS-R01-03', async ({
    registerPage,
  }) => {
    // Arrange
    const registerUserData = prepareUserDataForUi();
    const expectedErrorMessage = 'First name is required.';

    // Act
    await registerPage.fillRegisterFields(registerUserData);
    await registerPage.firstNameInput.fill('');
    await registerPage.lastNameInput.fill('');
    await registerPage.registerButton.click();

    //Assert
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(expectedErrorMessage);
  });
});
