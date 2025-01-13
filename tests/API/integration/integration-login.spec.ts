import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { expect, test } from '@_src/fixtures/merge.fixture';
import userDataJsonObject from '@_src/test-data/user.data.json';
import { parseResponseAndCheckStatus } from '@_src/utils/api.util';
import {
  API_URL,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD,
} from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;

// Dodanie pomocniczej funkcji do weryfikacji danych użytkownika
const verifyUserData = (userResponseJson: any, expectedData: any) => {
  const {
    first_name: userFirstName,
    last_name: userLastName,
    address: userAddress,
    city: userCity,
    country: userCountry,
    dob: userDob,
  } = userResponseJson;

  expect(userFirstName).toBe(expectedData.jsonUserFirstName);
  expect(userLastName).toBe(expectedData.jsonLastName);
  expect(userAddress).toBe(expectedData.jsonAddress);
  expect(userCity).toBe(expectedData.jsonCity);
  expect(userCountry).toBe(expectedData.jsonCountry);
  expect(userDob).toBe(expectedData.jsonDob);
};

// Dodanie pomocniczej funkcji do wykonywania requestów
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

  test('POST login to portal with default credentials @API-I-ECTS-R04-01 @API-I-ECTS-R04-02', async ({
    request,
  }) => {
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
    expect(loginResponseJson.token_type).toBe('bearer');
    expect(accessToken).not.toBeNull();
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

    verifyUserData(userResponseJson, userDataJsonObject.userDefaultAccountData);
  });
});
