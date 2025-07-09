import { useForm } from "@mantine/form";
import type { LoginRequest } from "../../types/LoginRequest.type";

export function useLoginForm() {
  return useForm<LoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email non valida"),

      password: (value) => (value.length < 6 ? "Almeno 6 caratteri" : null),
    },
  });
}
