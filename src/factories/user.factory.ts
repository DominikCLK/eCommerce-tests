import { RegisterUserModel } from '@_src/models/user.model';
import { fakerPL } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUserData(): RegisterUserModel {
  const registerUserData: RegisterUserModel = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userBirthDate: '2000-02-21',
    userAddress: faker.location.streetAddress(),
    userPostcode: faker.location.zipCode('##-###'),
    userCity: faker.location.city(),
    userState: fakerPL.location.state(),
    userPhone: "700800900",
    userEmail: faker.internet.email(),
    userPassword: faker.internet.password({ length: 20, prefix: '!"#123' }),
  };
  return registerUserData;
}
