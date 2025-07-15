import { useForm } from "@mantine/form";
import type { User } from "../../types/User.type";
import { useAuthContext } from "../../context/AuthContext";

export function useProfileForm() {
  const { user } = useAuthContext();

  return useForm<User>({
    initialValues:{
    id: user?.id ?? "",
    name: user?.name ?? "",
    surname: user?.surname ?? "",
    email: user?.email ?? "",
    birthDate: user?.birthDate ?? "",
    gender: user?.gender ?? "",
    phone: user?.phone ?? "",
    role: user?.role ?? "patient",
    },
    validate: {
      name: (val) => (val.trim().length > 0 ? null : "Il nome è obbligatorio"),

      surname: (val) =>
        val.trim().length > 0 ? null : "Il cognome è obbligatorio",

      email: (val) =>
        /^\S+@\S+\.\S+$/.test(val)
          ? null
          : "Inserisci un indirizzo email valido",

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
