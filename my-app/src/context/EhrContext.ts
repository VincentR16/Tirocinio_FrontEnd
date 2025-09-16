import { createContext, useContext } from "react";
import type { EhrRequest } from "../types/EhrRequest";
import type { UseFormReturn } from "react-hook-form";
import type { EhrFormValues } from "../hook/form/schema/ehrSchema";
import type { EHR } from "../types/Ehr.types";

// Tipi per gli elementi degli array
export type AllergyItem = {
  substance: string;
  code: string;
  criticality?: string;
  typeAllergy?: string;
  reactionDescription?: string;
  category: string;
};

export type ObservationItem = {
  codeObservation: string;
  statusObservation: string;
  value: number;
  categoryObservation: string;
  unit: string;
  performer?: string;
  code: string;
  comment?: string;
};

export type MedicationItem = {
  medication: string;
  medicationId: string;
  statusMedication:
    | "active"
    | "completed"
    | "entered-in-error"
    | "intended"
    | "stopped"
    | "on-hold"
    | "unknown";
  dosageInstructions: string;
  route?:
    | "oral"
    | "intravenous"
    | "subcutaneous"
    | "topical"
    | "nasal"
    | "ophthalmic"
    | "transdermal"
    | "rectal"
    | "sublingual"
    | "other";
  startDate: string;
  endDate?: string;
  reasonMedication?: string;
};

type EhrContextType = {
  ehr: EHR | undefined;
  setEhr: React.Dispatch<React.SetStateAction<EHR | undefined>>;
  ehrRequest: EhrRequest | undefined;
  setEhrRequest: (obj: EhrRequest | undefined) => void;
  handleNextStep: () => void;
  prevStep: () => void;
  nextStep: () => void;
  active: number;
  setActive: (obj: number) => void;

  // Gestione Allergies
  allergies: AllergyItem[];
  addAllergy: (allergy: AllergyItem) => boolean;
  removeAllergy: (index: number) => void;
  updateAllergy: (index: number, allergy: AllergyItem) => void;

  // Gestione Observations
  observations: ObservationItem[];
  addObservation: (observation: ObservationItem) => boolean;
  removeObservation: (index: number) => void;
  updateObservation: (index: number, observation: ObservationItem) => void;

  // Gestione Medications
  medications: MedicationItem[];
  addMedication: (medication: MedicationItem) => boolean;
  removeMedication: (index: number) => void;
  updateMedication: (index: number, medication: MedicationItem) => void;

  // Funzione per ottenere tutti i dati del form inclusi gli array
  getAllFormData: () => EhrFormValues & {
    allergies: AllergyItem[];
    observations: ObservationItem[];
    medications: MedicationItem[];
  };
  mapFormToEhr: () => EhrRequest;
} & UseFormReturn<EhrFormValues>;

export const EhrContext = createContext<EhrContextType | undefined>(undefined);

export function useEhrContext() {
  const context = useContext(EhrContext);
  if (!context)
    throw new Error("useEhrContext must be used within a EhrProvider");

  return context;
}
