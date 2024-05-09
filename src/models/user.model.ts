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
  address: string;
  city: string;
  country: string;
  dob: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  postcode: string;
  state: string;
}
