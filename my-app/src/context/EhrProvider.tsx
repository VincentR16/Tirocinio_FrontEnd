import { useState, type ReactNode } from "react";
import type { EhrRequest } from "../types/EhrRequest";
import { EhrContext } from "./EhrContext";
import { useEhrForm } from "../hook/form/useEhrForn";
import { stepSchemas } from "../hook/form/schema/ehrSchema";
import z from "zod";

export function EhrProvider({ children }: { children: ReactNode }) {
  const [ehrRequest, setEhr] = useState<EhrRequest | undefined>();

  const form = useEhrForm();

  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 7 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleNextStep = async () => {
    const currentSchema = stepSchemas[active];
    const values = form.getValues();
    console.log("handle")

    // ✅ Validazione con Zod
    try {
       await currentSchema.parseAsync(values);
       console.log("eccoci ", currentSchema)
       nextStep();
    } catch (error) {
      console.log("ok")
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setError(issue.path[0] as any, {
        message: issue.message,
      });
      }
    }
    return;
    }
  };

  return (
    <EhrContext.Provider
      value={{
        ...form,
        ehrRequest,
        setEhr,
        handleNextStep,
        prevStep,
        active,
        setActive,
      }}
    >
      {children}
    </EhrContext.Provider>
  );
}
