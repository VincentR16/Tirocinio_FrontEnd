import type { Bundle, FhirResource, OperationOutcome } from "fhir/r4";
import { createContext, useContext } from "react";

type JsonContextType = {
  opened: boolean;
  openModal: () => void;
  closeModal: () => void;
  json: OperationOutcome | Bundle<FhirResource> | undefined;
  setJson: React.Dispatch<
    React.SetStateAction<OperationOutcome | Bundle<FhirResource> | undefined>
  >;
};

export const JsonContext = createContext<JsonContextType | undefined>(
  undefined
);

export function useJsonContext() {
  const context = useContext(JsonContext);
  if (!context) {
    throw new Error("useJsonContext must be used whitin a JsonProvider");
  }
  return context;
}
