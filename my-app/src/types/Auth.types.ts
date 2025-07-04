// src/types/Auth.types.ts

export const AuthTypeEnum = {
  LOGIN: "login",
  REGISTER_PATIENT: "register-patient",
  REGISTER_DOCTOR: "register-doctor",
} as const;

export type AuthType = (typeof AuthTypeEnum)[keyof typeof AuthTypeEnum];
