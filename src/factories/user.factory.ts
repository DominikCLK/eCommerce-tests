import {
    RegisterApiUserModel,
    RegisterUserModel,
} from '@_src/models/user.model';
import { fakerPL } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/pl';

export function prepareUserDataForUi(): RegisterUserModel {
  const registerUserData: RegisterUserModel = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userBirthDate: '2000-02-21',
    userAddress: faker.location.streetAddress(),
    userPostcode: faker.location.zipCode('##-###'),
    userCity: faker.location.city(),
    userState: fakerPL.location.state(),
    userPhone: '700800900',
    userEmail: faker.internet.email(),
    userPassword: faker.internet.password({ length: 20, prefix: '!1' }),
  };
  return registerUserData;
}

export function prepareUserDataForApi(): RegisterApiUserModel {
  const registerUserDataApi: RegisterApiUserModel = {
    first_name: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    last_name: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 20, prefix: '!1' }),
    phone: '700800900',
    dob: '2000-02-21',
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: fakerPL.location.state(),
      country: 'PL',
      postal_code: faker.location.zipCode('##-###')
    }
  };
  return registerUserDataApi;
}
