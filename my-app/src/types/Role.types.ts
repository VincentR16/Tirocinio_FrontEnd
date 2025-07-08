export const RoleTypeEnum = {
  DOCTOR: "doctor",
  PATIENT: "patient",
} as const;

export type RoleType= (typeof RoleTypeEnum)[keyof typeof RoleTypeEnum];