import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { prepareRandomUserData } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/models/user.model';
import { parseResponseAndCheckStatus } from '@_src/utils/api.util';
import { API_URL } from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;
const registerUserData: RegisterUserModel = prepareRandomUserData();

test.describe.configure({ mode: 'serial' });
test.describe('Register new user and login to portal @API-integration', () => {
  let createdUserId;
  let accessToken;

  test('POST register new user', async ({ request }) => {
    // Act
    const registerNewUserResponse = await request.post(
      buildUrl(APIEndpoints.REGISTER_ENDPOINT),
      {
        data: {
          address: registerUserData.userAddress,
          city: registerUserData.userCity,
          country: 'PL',
          dob: registerUserData.userBirthDate,
          email: registerUserData.userEmail,
          first_name: registerUserData.userFirstName,
          last_name: registerUserData.userLastName,
          password: registerUserData.userPassword,
          phone: registerUserData.userPhone,
          postcode: registerUserData.userPostcode,
          state: registerUserData.userState,
        },
      },
    );

    const registerNewUserResponseJson = await parseResponseAndCheckStatus(
      registerNewUserResponse,
      201,
    );
    createdUserId = registerNewUserResponseJson.id;

    // Assert
    expect(createdUserId).not.toBeNull();
  });

  test('POST login to portal with created user', async ({ request }) => {
    // Act
    const newUserLoginResponse = await request.post(
      buildUrl(APIEndpoints.LOGIN_ENDPOINT),
      {
        data: {
          email: registerUserData.userEmail,
          password: registerUserData.userPassword,
        },
      },
    );

    const newUserLoginResponseJson = await parseResponseAndCheckStatus(
      newUserLoginResponse,
      200,
    );
    const tokenType = newUserLoginResponseJson.token_type;
    accessToken = newUserLoginResponseJson.access_token;

    // Assert
    expect(tokenType).toBe('bearer');
    expect(accessToken).not.toBeNull();
  });

  test('GET verify new user', async ({ request }) => {
    // Act
    const userResponse = await request.get(
      buildUrl(APIEndpoints.USER_ENDPOINT),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const userResponseJson = await parseResponseAndCheckStatus(
      userResponse,
      200,
    );
    const userId = userResponseJson.id;

    // Assert
    expect(userId).toBe(createdUserId);
  });
});
