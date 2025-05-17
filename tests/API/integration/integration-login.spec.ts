import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { expect, test } from '@_src/fixtures/merge.fixture';
import {
  ExpectedUserData,
  RegisterApiUserModel,
} from '@_src/models/user.model';
import userDataJsonObject from '@_src/test-data/user.data.json';
import { parseResponseAndCheckStatus } from '@_src/utils/api.util';
import {
  API_URL,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD,
} from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;

const assertUserMatchesExpectedData = (
  userResponseJson: RegisterApiUserModel,
  expectedData: ExpectedUserData,
) => {
  const {
    first_name: userFirstName,
    last_name: userLastName,
    address: userAddress,
    dob: userDob,
  } = userResponseJson;

  expect(userFirstName).toBe(expectedData.jsonUserFirstName);
  expect(userLastName).toBe(expectedData.jsonLastName);
  expect(userAddress.street).toBe(expectedData.jsonAddress);
  expect(userAddress.city).toBe(expectedData.jsonCity);
  expect(userAddress.country).toBe(expectedData.jsonCountry);
  expect(userDob).toBe(expectedData.jsonDob);
};

const makeRequest = async (request: any, options: any) => {
  try {
    const response = await request[options.method](options.url, options.config);
    return await parseResponseAndCheckStatus(response, options.expectedStatus);
  } catch (error) {
    throw new Error(`${options.errorMessage}: ${error.message}`);
  }
};

test.describe.configure({ mode: 'serial' });
test.describe('Login to portal and verify user @API-integration', () => {
  let accessToken: string;

  test.beforeAll(async ({ request }) => {
    const loginResponseJson = await makeRequest(request, {
      method: 'post',
      url: buildUrl(APIEndpoints.LOGIN_ENDPOINT),
      config: {
        data: {
          email: DEFAULT_USER_EMAIL,
          password: DEFAULT_USER_PASSWORD,
        },
      },
      expectedStatus: 200,
      errorMessage: 'Login failed',
    });

    accessToken = loginResponseJson.access_token;
    expect(typeof accessToken).toBe('string');
    expect(accessToken.length).toBeGreaterThan(0);
  });

  test('GET verify default user data and access token @API-I-ECTS-R04-03', async ({
    request,
  }) => {
    const userResponseJson = await makeRequest(request, {
      method: 'get',
      url: buildUrl(APIEndpoints.USER_ENDPOINT),
      config: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      expectedStatus: 200,
      errorMessage: 'User verification failed',
    });

    assertUserMatchesExpectedData(
      userResponseJson,
      userDataJsonObject.userDefaultAccountData,
    );
  });
});