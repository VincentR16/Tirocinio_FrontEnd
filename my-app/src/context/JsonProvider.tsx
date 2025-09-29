import { useState, type ReactNode } from "react";
import { JsonContext } from "./JsonContext";
import { useDisclosure } from "@mantine/hooks";
import type { Bundle, OperationOutcome } from "fhir/r4";

export function JsonProvider({ children }: { children: ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [json, setJson] = useState<Bundle | OperationOutcome>();
  return (
    <JsonContext.Provider
      value={{
        opened,
        openModal: open,
        closeModal: close,
        json,
        setJson
      }}
    >
      {children}
    </JsonContext.Provider>
  );
}
