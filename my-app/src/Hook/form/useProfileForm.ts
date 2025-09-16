import { useForm } from "@mantine/form";
import { useAuthContext } from "../../context/AuthContext";
import type { UpdateUserRequest } from "../../types/UpdateUserRequest.type";



export function useProfileForm() {
  const { user } = useAuthContext();

  return useForm<UpdateUserRequest>({
    initialValues: {
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      email: user?.email ?? "",
      birthDate: user?.birthDate ?? "",
      gender: user?.gender ?? "",
      phone: user?.phone ?? "",
      location: user?.location ?? "",
      ssn: user?.patient?.ssn ?? "",
      ospidal: user?.doctor?.ospidal ?? "",
    },
    validate: {
      name: (val) => (val.trim().length > 0 ? null : "name is required"),

      surname: (val) =>
        val.trim().length > 0 ? null : "Surname is required",

      email: (val) =>
        /^\S+@\S+\.\S+$/.test(val)
          ? null
          : "Inserisci un indirizzo email valido",

      location: (val) => (val ? null : "Location'name is required"),

      ssn: (val) =>
        !val || val === "" || /^[A-Z0-9]{16}$/.test(val)
          ? null
          : "Codice fiscale non valido (16 caratteri alfanumerici)",

      gender: (val) =>
        typeof val === "string" && val.trim().length > 0
          ? null
          : "Seleziona il genere",

      birthDate: (val) => (val ? null : "date of birth is required"),

      phone: (val) =>
        /^\+\d{2} \d{3} \d{3}-\d{4}$/.test(val)
          ? null
          : "phone number is not valid (+39 000 000-0000)",
      ospidal: (val) =>
        typeof val === "string" && val.trim().length > 0
          ? null
          : "Ospidal name is required",
    },
  });
}
