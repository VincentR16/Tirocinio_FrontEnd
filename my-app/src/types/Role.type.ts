export const RoleTypeEnum = {
  DOCTOR: "doctor",
  PATIENT: "patient",
  undefined,
} as const;

export type RoleType= (typeof RoleTypeEnum)[keyof typeof RoleTypeEnum];