import { APIEndpoints } from '@_src/enums/endpoints.dicts';
import { prepareUserDataForApi } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RequestData } from '@_src/models/requests.model';
import { RegisterApiUserModel } from '@_src/models/user.model';
import { parseResponseAndCheckStatus } from '@_src/utils/api.util';
import { API_URL } from 'config/env.config';

const buildUrl = (endpoint: string): string => `${API_URL}${endpoint}`;

const buildRequestData = (
  endpoint: string,
  data?: Record<string, unknown>,
  token?: string,
): RequestData => ({
  url: buildUrl(endpoint),
  options: {
    ...(data && { data }),
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  },
});

test.describe.configure({ mode: 'serial' });
test.describe.skip('Register new user and login to portal @API-integration', () => {
  let createdUserId: string;
  let accessToken: string;
  const registerUserDataApi: RegisterApiUserModel = prepareUserDataForApi();

  test('POST register new user @API-I-ECTS-R03-01', async ({ request }) => {
    const { url, options } = buildRequestData(
      APIEndpoints.REGISTER_ENDPOINT,
      registerUserDataApi as unknown as Record<string, unknown>,
    );
    const registerNewUserResponse = await request.post(url, options);
    const registerNewUserResponseJson = await parseResponseAndCheckStatus(
      registerNewUserResponse,
      201,
    );
    createdUserId = registerNewUserResponseJson.id;

    expect(createdUserId).not.toBeNull();
  });

  test('POST login to portal with created user @API-I-ECTS-R03-02', async ({
    request,
  }) => {
    const loginData = {
      email: registerUserDataApi.email,
      password: registerUserDataApi.password,
    };

    const { url, options } = buildRequestData(
      APIEndpoints.LOGIN_ENDPOINT,
      loginData,
    );
    const newUserLoginResponse = await request.post(url, options);
    const newUserLoginResponseJson = await parseResponseAndCheckStatus(
      newUserLoginResponse,
      200,
    );
    const tokenType = newUserLoginResponseJson.token_type;
    accessToken = newUserLoginResponseJson.access_token;

    expect(tokenType).toBe('bearer');
    expect(accessToken).not.toBeNull();
  });

  test('GET verify new user @API-I-ECTS-R03-03', async ({ request }) => {
    const { url, options } = buildRequestData(
      APIEndpoints.USER_ENDPOINT,
      undefined,
      accessToken,
    );
    const userResponse = await request.get(url, options);
    const userResponseJson = await parseResponseAndCheckStatus(
      userResponse,
      200,
    );
    const userId = userResponseJson.id;

    expect(userId).toBe(createdUserId);
  });
});
