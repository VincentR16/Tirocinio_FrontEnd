import { z } from "zod";

// Patient
export const patientSchema = z.object({
  name: z.string().min(2, "Name too short"),
  surname: z.string().min(2, "Surname too short"),
  gender: z.enum(["Male", "Female", "Other"]),
  location: z.string().optional(),
  email: z.string().email("Invalid email"),
  ssn: z.string().length(16, "SSN must be 16 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid date format",
    }),
  phone: z.string().min(10, "Invalid phone number"),
});

// Encounter
export const encounterSchema = z.object({
  statusEncounter: z.string().min(1, "Status is required"),
  class: z.string().min(1, "Class is required"),
  locationEncounter: z.string().min(1, "Location is required"),
  serviceProvider: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  start: z
    .string()
    .min(1, "Start time is required")
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid start time",
    }),
  end: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(new Date(val).getTime()), {
      message: "Invalid end time",
    }),
  reason: z.string().optional(),
});

// Allergy
export const allergySchema = z.object({
  substance: z.string().min(1, "Substance is required"),
  criticality: z.string().optional(),
  typeAllergy: z.string().optional(),
  reactionDescription: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

const arrayAllergySchema = z.object({
  allergies: z.array(allergySchema),
});

// Observations
export const observationSchema = z.object({
  statusObservation: z.string().min(1, "Status is required"),
  value: z.number(),
  categoryObservation: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
  performer: z.string().optional(),
  code: z.string().min(1, "Code is required"),
  comment: z.string().optional(),
});

const arrayObservationSchema = z.object({
  observations: z.array(observationSchema),
});

//Condition
export const conditionSchema = z.object({
  conditionCode: z.string().min(1, "Condition code is required"),
  clinicalStatus: z.string().min(1, "Clinical status is required"),
  severity: z.string().optional(),
  category: z.string().optional(),
  bodySite: z.string().optional(),
  recorder: z.string().optional(),
  note: z.string().optional(),
});

export const procedureSchema = z.object({
  procedureCode: z.string().min(1, "Procedure code is required"),

  statusProcedure: z
    .enum(["in-progress", "completed", "not-done"] as const)
    .refine((val) => !!val, {
      message: "Status is required",
    }),

  performer: z.string().optional(),

  reason: z.string().optional(),

  notes: z.string().optional(),
});

const medicationStatusEnum = z.enum([
  "active",
  "completed",
  "entered-in-error",
  "intended",
  "stopped",
  "on-hold",
  "unknown",
]);

const routeEnum = z.enum([
  "oral",
  "intravenous",
  "subcutaneous",
  "topical",
  "nasal",
  "ophthalmic",
  "transdermal",
  "rectal",
  "sublingual",
  "other",
]);

export const medicationSchema = z.object({
  medication: z.string().min(1, "Medication name is required"),

  statusMedication: medicationStatusEnum,

  dosageInstructions: z.string().min(1, "Dosage instructions are required"),

  route: routeEnum.optional(), // non obbligatorio nel form

  startDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Start date is required",
  }),

  endDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(new Date(val).getTime()), {
      message: "Invalid end date",
    }),

  reasonMedication: z.string().optional(),
});

export const stepSchemas = [
  patientSchema,
  encounterSchema,
  arrayAllergySchema,
  arrayObservationSchema,
  conditionSchema,
  procedureSchema,
  medicationSchema,
];

// tipizzazione singola per ogni schema
export type PatientFormValues = z.infer<typeof patientSchema>;
export type EncounterFormValues = z.infer<typeof encounterSchema>;
export type AllergyFormValues = z.infer<typeof arrayAllergySchema>;
export type ObservationFormValues = z.infer<typeof arrayObservationSchema>;
export type ConditionFormValues = z.infer<typeof conditionSchema>;
export type ProcedureFormValues = z.infer<typeof procedureSchema>;
export type MedicationFormValues = z.infer<typeof medicationSchema>;

// tipo unificato per tutto il form (senza usare .merge)
export type EhrFormValues = PatientFormValues &
  EncounterFormValues &
  AllergyFormValues &
  ObservationFormValues &
  ConditionFormValues &
  ProcedureFormValues &
  MedicationFormValues;
