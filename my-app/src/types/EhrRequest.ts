import type {
  AllergyIntolerance,
  Condition,
  Encounter,
  MedicationRequest,
  Observation,
  Patient,
  Procedure,
} from "fhir/r4";

export type EhrRequest = {
  patient: Patient;
  encounter: Encounter;
  condition: Condition;
  procedure: Procedure;
  allergies: AllergyIntolerance[];
  observations: Observation[];
  medications: MedicationRequest[];
  patientEmail: string;
};
