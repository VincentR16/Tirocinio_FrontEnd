import type { AllergyIntolerance, Condition, Encounter, MedicationStatement, Observation, Patient, Procedure } from "fhir/r4"

export type EhrRequest = {
    patient: Patient,
    ecounter: Encounter,
    allergy: AllergyIntolerance,
    observation: Observation,
    condition: Condition,
    procedure: Procedure,
    medicalStatement: MedicationStatement,
}