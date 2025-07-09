import { type RoleType } from "./Role.type"; 

export type RegisterRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
  ssn?: string;     
  gender: string;
  birthDate: string;          
  phone: string;
  role: RoleType;   
  ospidal?: string;          
};
