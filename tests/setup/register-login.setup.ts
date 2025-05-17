import { STORAGE_STATE } from '@_pw-config';
import { prepareUserDataForUi } from '@_src/factories/user.factory';
import { expect, test as setup } from '@_src/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/models/user.model';

setup.describe('Register, login to app and save session', () => {
  let registerUserData: RegisterUserModel;

  setup.beforeEach(async ({ registerPage }) => {
    registerUserData = prepareUserDataForUi();
    await registerPage.goto();
  });

  setup(
    'Register new user @setup',
    async ({ registerPage, loginPage, page }) => {
      // Arrange:
      const expectedWelcomeTitle =
        'Practice Software Testing - Toolshop - v5.0';
      const loggedHeading = 'My account';

      // Act:
      await registerPage.fillRegisterFields(registerUserData);
      await registerPage.registerButton.click();
      const title = await registerPage.getTitle();

      //Assert
      expect(title).toContain(expectedWelcomeTitle);
      await expect(page).toHaveURL(loginPage.url);
      await expect(loginPage.loginHeading).toBeVisible();
      await expect(loginPage.registerLink).toBeVisible();
      await expect(loginPage.forgotPasswordLink).toBeVisible();

      await setup.step('login as a new user and save session', async () => {
        //Act
        await loginPage.login(registerUserData);

        //Assert
        await expect(page.locator('[data-test="page-title"]')).toContainText(
          loggedHeading,
        );

        await page.context().storageState({ path: STORAGE_STATE });
      });
    },
  );
});
