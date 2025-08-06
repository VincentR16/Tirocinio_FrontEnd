import { useForm } from "react-hook-form";
import type { EhrFormValues } from "./schema/ehrSchema";

export function useEhrForm() {
  return useForm<EhrFormValues>({
    mode: "onTouched",
  });
}