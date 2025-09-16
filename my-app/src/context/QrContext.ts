import { createContext, useContext } from "react";


type QrContextType = {
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

export const QrContext = createContext<QrContextType | undefined>(
  undefined
);

export function useQrContext() {
  const context = useContext(QrContext);
  if (!context) {
    throw new Error("useWelcomeContext must be used within a HomeProvider");
  }
  return context;
}
