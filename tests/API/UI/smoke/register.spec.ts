import { prepareRandomUserData } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/models/user.model';

test.describe('Verify register', () => {
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ registerPage }) => {
    registerUserData = prepareRandomUserData();
    await registerPage.goto();
  });

  test('Verify that users can successfully register account', async ({
    registerPage,
    loginPage,
    page,
  }) => {
    // Arrange
    const expectedWelcomeTitle = 'Practice Software Testing - Toolshop - v5.0';

    // Act
    await registerPage.register(registerUserData);
    const title = await registerPage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginHeading).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });
});
