import { z } from "zod";

// Patient Schema
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

// Encounter Schema
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

// Allergy Schema (elemento singolo)
export const allergyItemSchema = z.object({
  code: z.string().min(1, "Code is required"),
  substance: z.string().min(1, "Substance is required"),
  criticality: z.string().optional(),
  typeAllergy: z.string().optional(),
  reactionDescription: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

// Schema per validare l'array di allergies (step validation)
export const allergiesStepSchema = z.object({
  allergies: z.array(allergyItemSchema).min(0, "At least one allergy is required"),
});

// Observation Schema (elemento singolo)
export const observationItemSchema = z.object({
  codeObservation: z.string().min(1, "Observation code is required"),
  statusObservation: z.string().min(1, "Status is required"),
  value: z.number().min(0, "Value must be positive"),
  categoryObservation: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
  performer: z.string().optional(),
  code: z.string().min(1, "Code is required"),
  comment: z.string().optional(),
});

// Schema per validare l'array di observations (step validation)
export const observationsStepSchema = z.object({
  observations: z.array(observationItemSchema).min(0, "At least one observation is required"),
});

// Condition Schema
export const conditionSchema = z.object({
  conditionId: z.string().min(1, "Condition ID is required"),
  conditionCode: z.string().min(1, "Condition code is required"),
  clinicalStatus: z.string().min(1, "Clinical status is required"),
  severity: z.string().optional(),
  category: z.string().optional(),
  bodySite: z.string().optional(),
  recorder: z.string().optional(),
  note: z.string().optional(),
});

// Procedure Schema
export const procedureSchema = z.object({
  procedureId: z.string().min(1, "Procedure ID is required"),
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

// Medication Enums
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

// Medication Schema (elemento singolo)
export const medicationItemSchema = z.object({
  medication: z.string().min(1, "Medication name is required"),
  medicationId: z.string().min(1, "Medication ID is required"),
  statusMedication: medicationStatusEnum,
  dosageInstructions: z.string().min(1, "Dosage instructions are required"),
  route: routeEnum.optional(),
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

// Schema per validare l'array di medications (step validation)
export const medicationsStepSchema = z.object({
  medications: z.array(medicationItemSchema).min(0, "At least one medication is required"),
});

// Schema per ogni step
export const stepSchemas = [
  patientSchema,              // Step 0: Patient Info
  encounterSchema,            // Step 1: Encounter Info  
  allergiesStepSchema,        // Step 2: Allergies (array validation)
  observationsStepSchema,     // Step 3: Observations (array validation)
  conditionSchema,            // Step 4: Condition Info
  procedureSchema,            // Step 5: Procedure Info
  medicationsStepSchema,      // Step 6: Medications (array validation)
];

// Type definitions per i form singoli
export type PatientFormValues = z.infer<typeof patientSchema>;
export type EncounterFormValues = z.infer<typeof encounterSchema>;
export type AllergyItem = z.infer<typeof allergyItemSchema>;
export type ObservationItem = z.infer<typeof observationItemSchema>;
export type ConditionFormValues = z.infer<typeof conditionSchema>;
export type ProcedureFormValues = z.infer<typeof procedureSchema>;
export type MedicationItem = z.infer<typeof medicationItemSchema>;

// Type per gli array
export type AllergiesStepValues = z.infer<typeof allergiesStepSchema>;
export type ObservationsStepValues = z.infer<typeof observationsStepSchema>;
export type MedicationsStepValues = z.infer<typeof medicationsStepSchema>;

// Tipo unificato per tutto il form finale
export type EhrFormValues = PatientFormValues &
  EncounterFormValues &
  AllergiesStepValues &
  ObservationsStepValues &
  ConditionFormValues &
  ProcedureFormValues &
  MedicationsStepValues;