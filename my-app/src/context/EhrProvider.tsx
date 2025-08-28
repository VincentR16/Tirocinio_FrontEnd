import { useState, type ReactNode } from "react";
import type { EhrRequest } from "../types/EhrRequest";
import { 
  EhrContext, 
  type AllergyItem, 
  type ObservationItem, 
  type MedicationItem 
} from "./EhrContext";
import { useEhrForm } from "../hook/form/useEhrForm";
import { stepSchemas } from "../hook/form/schema/ehrSchema";
import { notifications } from "@mantine/notifications";
import z from "zod";

export function EhrProvider({ children }: { children: ReactNode }) {
  const [ehrRequest, setEhr] = useState<EhrRequest | undefined>();
  const form = useEhrForm();
  const [active, setActive] = useState(0);
  
  // Stati per gli array
  const [allergies, setAllergies] = useState<AllergyItem[]>([]);
  const [observations, setObservations] = useState<ObservationItem[]>([]);
  const [medications, setMedications] = useState<MedicationItem[]>([]);

  const nextStep = () =>
    setActive((current) => (current < 7 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // Funzioni per gestire le allergies
  const addAllergy = (allergy: AllergyItem): boolean => {
    // Validazione
    if (!allergy.substance?.trim() || !allergy.category?.trim() || !allergy.code?.trim()) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "Substance, category, and code are required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Controllo duplicati
    const isDuplicate = allergies.some(
      existing => existing.substance?.toLowerCase().trim() === allergy.substance?.toLowerCase().trim()
    );

    if (isDuplicate) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "There is already an allergy with the same substance",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    setAllergies(prev => [...prev, allergy]);
    notifications.show({
      title: "Success!",
      color: "green",
      message: "Allergy added successfully",
      autoClose: 2000,
      position: "bottom-right",
    });
    return true;
  };

  const removeAllergy = (index: number) => {
    setAllergies(prev => prev.filter((_, i) => i !== index));
  };

  const updateAllergy = (index: number, allergy: AllergyItem) => {
    setAllergies(prev => prev.map((item, i) => i === index ? allergy : item));
  };

  // Funzioni per gestire le observations
  const addObservation = (observation: ObservationItem): boolean => {
    if (!observation.statusObservation?.trim() || !observation.categoryObservation?.trim() || !observation.code?.trim()) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "Status, category, and code are required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Controllo duplicati basato su code + category
    const isDuplicate = observations.some(
      existing => existing.code === observation.code && existing.categoryObservation === observation.categoryObservation
    );

    if (isDuplicate) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "There is already an observation with the same code and category",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    setObservations(prev => [...prev, observation]);
    notifications.show({
      title: "Success!",
      color: "green",
      message: "Observation added successfully",
      autoClose: 2000,
      position: "bottom-right",
    });
    return true;
  };

  const removeObservation = (index: number) => {
    setObservations(prev => prev.filter((_, i) => i !== index));
  };

  const updateObservation = (index: number, observation: ObservationItem) => {
    setObservations(prev => prev.map((item, i) => i === index ? observation : item));
  };

  // Funzioni per gestire le medications
  const addMedication = (medication: MedicationItem): boolean => {
    if (!medication.medication?.trim() || !medication.statusMedication?.trim() || !medication.dosageInstructions?.trim()) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "Medication name, status, and dosage instructions are required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Validazione data di inizio
    if (!medication.startDate || isNaN(new Date(medication.startDate).getTime())) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "Valid start date is required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Controllo duplicati basato sul nome del farmaco
    const isDuplicate = medications.some(
      existing => existing.medication?.toLowerCase().trim() === medication.medication?.toLowerCase().trim()
    );

    if (isDuplicate) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "There is already a medication with the same name",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    setMedications(prev => [...prev, medication]);
    notifications.show({
      title: "Success!",
      color: "green",
      message: "Medication added successfully",
      autoClose: 2000,
      position: "bottom-right",
    });
    return true;
  };

  const removeMedication = (index: number) => {
    setMedications(prev => prev.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, medication: MedicationItem) => {
    setMedications(prev => prev.map((item, i) => i === index ? medication : item));
  };

  const handleNextStep = async () => {
    const values = form.getValues();
    
    // Per gli step degli array, aggiungiamo i dati dagli stati separati
    let dataToValidate = { ...values };
    
    if (active === 2) { // Step allergies
      dataToValidate = { ...values, allergies };
    } else if (active === 3) { // Step observations
      dataToValidate = { ...values, observations };
    } else if (active === 6) { // Step medications
      dataToValidate = { ...values, medications };
    }

    const currentSchema = stepSchemas[active];

    try {
      await currentSchema.parseAsync(dataToValidate);
      
      // Gli step degli array non procedono automaticamente se vuoti
      // Ma permettono di procedere al prossimo step anche senza elementi
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
          console.warn("Validation issues:", error.issues);
          const path = issue.path.join(".");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.setError(path as any, {
            message: issue.message,
          });
        }
      }
      throw new Error("Form validation failed");
    }
  };

  // Funzione per ottenere tutti i dati del form inclusi gli array
  const getAllFormData = () => {
    const formData = form.getValues();
    return {
      ...formData,
      allergies,
      observations,
      medications
    };
  };

  return (
    <EhrContext.Provider
      value={{
        ...form,
        ehrRequest,
        setEhr,
        handleNextStep,
        prevStep,
        nextStep,
        active,
        setActive,
        
        // Array management
        allergies,
        addAllergy,
        removeAllergy,
        updateAllergy,
        
        observations,
        addObservation,
        removeObservation,
        updateObservation,
        
        medications,
        addMedication,
        removeMedication,
        updateMedication,
        
        // Funzione per ottenere tutti i dati
        getAllFormData,
      }}
    >
      {children}
    </EhrContext.Provider>
  );
}