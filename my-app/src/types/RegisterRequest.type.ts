import { type RoleType } from "./Role.type"; 

export type RegisterRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
  codiceFiscale?: string;     
  gender: string;
  birthDate: Date | null;          
  phone: string;
  role: RoleType;             
};
