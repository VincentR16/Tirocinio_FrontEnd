import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ehrSchema, type EhrFormValues } from "./schema/ehrSchema";

export function useEhrForm() {
  return useForm<EhrFormValues>({
    resolver: zodResolver(ehrSchema),
    mode: "onBlur",
  });
}