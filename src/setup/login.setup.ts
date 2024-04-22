import { STORAGE_STATE } from '@_pw-config';
import { expect, test as setup } from '@_src/fixtures/merge.fixture';
import { testUser } from '@_src/test-data/user.data';

setup('Login and save session', async ({ loginPage, page }) => {
  // Arrange
  const expectedWelcomeTitle = 'Welcome';

  // Act
  await loginPage.goto();
  const welcomePage = await loginPage.login(testUser);

  //Assert
  await expect(page).toHaveURL(loginPage.url);

  await page.context().storageState({ path: STORAGE_STATE });
});
