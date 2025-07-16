export type UpdateUserRequest = {
  name: string;
  surname: string;
  email: string;
  location: string;
  birthDate: string;
  gender: string;
  phone: string;
  ssn?: string;
  ospidal?: string;
};