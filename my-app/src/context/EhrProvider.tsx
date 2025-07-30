import { useState, type ReactNode } from "react";
import type { EhrRequest } from "../types/EhrRequest";
import { EhrContext } from "./EhrContext";
import { useEhrForm } from "../hook/form/useEhrForn";

export function EhrProvider({ children }: { children: ReactNode }) {
  const [ehrRequest, setEhr] = useState<EhrRequest | undefined>();
    const {register, control, formState} = useEhrForm();

  return (
    <EhrContext.Provider
      value={{
        ehrRequest,
        setEhr,
        register,
        control,
        formState,
      }}
    >
      {children}
    </EhrContext.Provider>
  );
}
