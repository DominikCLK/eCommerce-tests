import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { expect, test } from '@_src/fixtures/merge.fixture';
import userDataJsonObject from '@_src/test-data/user.data.json';
import {
  API_URL,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD,
} from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;

test.describe.configure({ mode: 'serial' });
test.describe('Login to portal and verify user @API-integration', () => {
  let accessToken;

  test('POST login to portal with default credentials', async ({ request }) => {
    // Act
    try {
      const loginResponse = await request.post(
        buildUrl(APIEndpoints.LOGIN_ENDPOINT),
        {
          data: {
            email: DEFAULT_USER_EMAIL,
            password: DEFAULT_USER_PASSWORD,
          },
        },
      );

      const loginResponseJson = await loginResponse.json();
      const tokenType = loginResponseJson.token_type;
      accessToken = loginResponseJson.access_token;

      // Assert
      expect(loginResponse.status()).toBe(200);
      expect(tokenType).toBe('bearer');
      expect(accessToken).not.toBeNull();
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  });

  test('GET verify default user data and access token', async ({ request }) => {
    // Act
    try {
      const userResponse = await request.get(
        buildUrl(APIEndpoints.USER_ENDPOINT),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const userResponseJson = await userResponse.json();

      const {
        first_name: userFirstName,
        last_name: userLastName,
        address: userAddress,
        city: userCity,
        country: userCountry,
        dob: userDob,
      } = userResponseJson;

      // Assert
      expect(userResponse.status()).toBe(200);
      expect(userFirstName).toBe(
        userDataJsonObject.userDefaultAccountData.jsonUserFirstName,
      );
      expect(userLastName).toBe(
        userDataJsonObject.userDefaultAccountData.jsonLastName,
      );
      expect(userAddress).toBe(
        userDataJsonObject.userDefaultAccountData.jsonAddress,
      );
      expect(userCity).toBe(userDataJsonObject.userDefaultAccountData.jsonCity);
      expect(userCountry).toBe(
        userDataJsonObject.userDefaultAccountData.jsonCountry,
      );
      expect(userDob).toBe(userDataJsonObject.userDefaultAccountData.jsonDob);
    } catch (error) {
      throw new Error(`User verification failed: ${error.message}`);
    }
  });
});
