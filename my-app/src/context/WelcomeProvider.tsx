import { useState, type ReactNode } from "react";
import { WelcomeContext } from "../context/WelcomeContext";
import { AuthTypeEnum, type AuthType } from "../types/Auth.type";
import { useDisclosure } from "@mantine/hooks";

export function WelcomeProvider({ children }: { children: ReactNode }) {
  const [authType, setAuthType] = useState<AuthType>(AuthTypeEnum.LOGIN);
  const [openedCode, { close: closeCode, open: openCode }] =
    useDisclosure(false);
  const [openedQr, { close: closeQr, open: openQr }] = useDisclosure(false);
  const [qrCode, setQrCode] = useState<string>("");
  return (
    <WelcomeContext.Provider
      value={{
        authType,
        setAuthType,
        openedCode,
        openCode,
        closeCode,
        openedQr,
        openQr,
        closeQr,
        qrCode,
        setQrCode,
      }}
    >
      {children}
    </WelcomeContext.Provider>
  );
}
