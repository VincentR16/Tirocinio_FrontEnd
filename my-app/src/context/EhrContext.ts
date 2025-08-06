import { createContext, useContext } from "react";
import type { EhrRequest } from "../types/EhrRequest";
import type { UseFormReturn } from "react-hook-form";
import type { EhrFormValues } from "../hook/form/schema/ehrSchema";

type EhrContextType = {
  ehrRequest: EhrRequest | undefined;
  setEhr: (obj: EhrRequest | undefined) => void;
  handleNextStep: () => void;
  prevStep: () => void;
  nextStep: () => void;
  active: number;
  setActive: (obj: number) => void;
} & UseFormReturn<EhrFormValues>;

export const EhrContext = createContext<EhrContextType | undefined>(undefined);

export function useEhrContext() {
  const context = useContext(EhrContext);
  if (!context)
    throw new Error("useEhrContext must be used within a EhrProvider");

  return context;
}
