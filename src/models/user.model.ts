export interface LoginUserModel {
  userEmail: string;
  userPassword: string;
}
export interface RegisterUserModel {
  userFirstName: string;
  userLastName: string;
  userBirthDate: string;
  userAddress: string;
  userPostcode: string;
  userCity: string;
  userState: string;
  userPhone: string;
  userEmail: string;
  userPassword: string;
}
export interface Address {
  street: string;
  city: string;
  country: string;
  postal_code?: string | null;
  state?: string | null;
}

export interface RegisterApiUserModel {
  address: Address;
  dob: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  postcode: string;
  state: string;
}

export interface ExpectedUserData {
  jsonUserFirstName: string;
  jsonLastName: string;
  jsonDob: string;
  jsonAddress: string;
  jsonCity: string;
  jsonCountry: string;
}