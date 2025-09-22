import { useDisclosure } from "@mantine/hooks";
import { useState, type ReactNode } from "react";
import { SendContext } from "./SendContext";

export function SendProvider({ children }: { children: ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState("");

  return (
    <SendContext.Provider
      value={{
        opened,
        openModal: open,
        closeModal: close,
        name,
        setName,
        surname,
        setSurname,
        id,
        setId,
      }}
    >
      {children}
    </SendContext.Provider>
  );
}
