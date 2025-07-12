import type { Doctor } from "./Doctor.type";
import type { Patient } from "./Patient.type";
import type { RoleType } from "./Role.type";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthDate: string | null;
  gender: string | null;
  phone: string | null;
  role: RoleType;
  patient?: Patient;
  doctor?: Doctor;
};
