import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { prepareUserDataForApi } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RegisterApiUserModel } from '@_src/models/user.model';
import { parseResponseAndCheckStatus } from '@_src/utils/api.util';
import { API_URL } from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;
const registerUserDataApi: RegisterApiUserModel = prepareUserDataForApi();

test.describe.configure({ mode: 'serial' });
test.describe('Register new user and login to portal @API-integration', () => {
  let createdUserId;
  let accessToken;

  test('POST register new user @API-I-ECTS-R03-01', async ({ request }) => {
    // Act
    const registerNewUserResponse = await request.post(
      buildUrl(APIEndpoints.REGISTER_ENDPOINT),
      {
        data: registerUserDataApi,
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

  test('POST login to portal with created user @API-I-ECTS-R03-02', async ({
    request,
  }) => {
    // Act
    const newUserLoginResponse = await request.post(
      buildUrl(APIEndpoints.LOGIN_ENDPOINT),
      {
        data: {
          email: registerUserDataApi.email,
          password: registerUserDataApi.password,
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

  test('GET verify new user @API-I-ECTS-R03-03', async ({ request }) => {
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
