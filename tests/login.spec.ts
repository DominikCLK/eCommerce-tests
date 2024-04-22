import { test } from '@_src/fixtures/merge.fixture';
import { testUser } from '@_src/test-data/user.data';

test.describe('Verify login', () => {
  test('Verify that users can successfully log in with valid credentials', async ({
    loginPage,
  }) => {
    // Act
    await loginPage.login(testUser);

    //Assert
  });
});
