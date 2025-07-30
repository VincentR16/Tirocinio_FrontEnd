import { createContext, useContext } from "react";
import type { EhrRequest } from "../types/EhrRequest";
import type { UseFormReturn } from "react-hook-form";
import type { EhrFormValues } from "../hook/form/schema/ehrSchema";

type EhrContextType = {
  ehrRequest: EhrRequest | undefined;
  setEhr: (obj: EhrRequest | undefined) => void;
} & Pick<UseFormReturn<EhrFormValues>, "register" | "control" | "formState">;;

export const EhrContext = createContext<EhrContextType | undefined>(undefined);

export function useEhrContext() {
  const context = useContext(EhrContext);
  if (!context)
    throw new Error("useEhrContext must be used within a EhrProvider");

  return context;
}
