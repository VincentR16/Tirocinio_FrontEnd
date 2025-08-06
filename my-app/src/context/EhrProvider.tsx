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

    try {
      await currentSchema.parseAsync(values);
      if (active === 2 || active === 3) return;
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
          console.warn("Validation issues:", (error as z.ZodError).issues);
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
      }}
    >
      {children}
    </EhrContext.Provider>
  );
}
