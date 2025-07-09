import { useForm } from "@mantine/form";
import type { RegisterRequest } from "../../types/RegisterRequest.type";
import { RoleTypeEnum } from "../../types/Role.type";

export function useRegisterForm() {
  return useForm<RegisterRequest>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      codiceFiscale: "",
      gender: "",
      birthDate: "",
      role: RoleTypeEnum.PATIENT,
      phone: "",
    },

    validate: {
      name: (val) => (val.trim().length > 0 ? null : "Il nome è obbligatorio"),

      surname: (val) =>
        val.trim().length > 0 ? null : "Il cognome è obbligatorio",

      email: (val) =>
        /^\S+@\S+\.\S+$/.test(val)
          ? null
          : "Inserisci un indirizzo email valido",

      password: (val) =>
        val.length < 6
          ? "La password deve contenere almeno 6 caratteri"
          : !/[A-Z]/.test(val)
          ? "La password deve contenere almeno una lettera maiuscola"
          : !/[0-9]/.test(val)
          ? "La password deve contenere almeno un numero"
          : null,

      codiceFiscale: (val) =>
        !val || val === "" || /^[A-Z0-9]{16}$/.test(val)
          ? null
          : "Codice fiscale non valido (16 caratteri alfanumerici)",

      gender: (val) => (val.trim().length > 0 ? null : "Seleziona il genere"),

      birthDate: (val) =>
          val ? null : "La data di nascita è obbligatoria",

      phone: (val) =>
        /^\+\d{2} \d{3} \d{3}-\d{4}$/.test(val)
          ? null
          : "Inserisci un numero di telefono valido (+39 000 000-0000)",
    },
  });
}
