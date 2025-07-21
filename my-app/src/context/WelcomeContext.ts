import { createContext, useContext } from "react";
import type { AuthType } from "../types/Auth.type";

type HomeContextType = {
  //serve per gestire componente login e i suoi campi
  authType: AuthType;
  setAuthType: (type: AuthType) =>  void;
  //serve per gestire l apertura e la chiusura del modal del 2FA
  openedCode: boolean;
  openCode: () => void;
  closeCode: () => void;
  //serve per gestire l apertura e la chiusura del modal del Qrcode
  openedQr: boolean;
  openQr: () => void;
  closeQr: () => void;
  //serve per conservare il qrCode
  qrCode: string;
  setQrCode: (val: string) => void;
};

export const WelcomeContext = createContext<HomeContextType | undefined>(
  undefined
);

export function useWelcomeContext() {
  const context = useContext(WelcomeContext);
  if (!context) {
    throw new Error("useWelcomeContext must be used within a HomeProvider");
  }
  return context;
}
