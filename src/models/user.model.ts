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

export interface RegisterApiUserModel {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
}

export interface UserAddress {
  street: string;
  city: string;
  country: string;
  postal_code: string | null;
  state: string | null;
}

export interface UserResponse {
  first_name: string;
  last_name: string;
  address: UserAddress;
  dob: string;
}

export interface ExpectedUserData {
  jsonUserFirstName: string;
  jsonLastName: string;
  jsonAddress: string;
  jsonCity: string;
  jsonCountry: string;
  jsonDob: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}