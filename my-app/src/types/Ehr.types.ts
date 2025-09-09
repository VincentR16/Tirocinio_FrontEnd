import type { AllergyIntolerance, Condition, Encounter, MedicationRequest, Observation, Patient, Procedure } from "fhir/r4";
import type { Doctor } from "./Doctor.type";


export interface EHR {
  id: string;
  createdAt: Date;
  
  patient: Patient;
  encounter?: Encounter;
  condition?: Condition;
  allergies: AllergyIntolerance[];
  observations: Observation[];
  procedure?: Procedure;
  medications: MedicationRequest[];

  createdBy: Doctor;
  patientEmail: string;
}