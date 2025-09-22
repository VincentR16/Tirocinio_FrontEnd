import { createContext, useContext } from "react";

type SendContextType = {
  opened: boolean;
  openModal: () => void;
  closeModal: () => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

export const SendContext = createContext<SendContextType | undefined>(
  undefined
);

export function useSendContext() {
  const context = useContext(SendContext);
  if (!context) {
    throw new Error("useSendContext must be used within a SendProvider");
  }
  return context;
}
