import type { Doctor } from "./Doctor.type";
import type { Patient } from "./Patient.type";
import type { RoleType } from "./Role.type";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  location: string;
  birthDate: string;
  gender: string;
  phone: string;
  role: RoleType;
  twoFactorAuthenticationSecret: string;
  patient?: Patient;
  doctor?: Doctor;
};
