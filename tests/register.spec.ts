import { test } from '@_src/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/models/user.model';
import { prepareRandomUserData } from '@_src/factories/user.factory';

test.describe('Verify login', () => {
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ registerPage }) => {
    registerUserData = prepareRandomUserData();
    await registerPage.goto();
  });
  
  test('Verify that users can successfully log in with valid credentials', async ({
    registerPage,
  }) => {
    // Act
    await registerPage.register(registerUserData);

    //Assert
  });
});
