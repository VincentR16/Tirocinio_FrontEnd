import { useState, type ReactNode } from "react";
import { QrContext } from "./QrContext";
import { useDisclosure } from "@mantine/hooks";

export function QrProvider({ children }: { children: ReactNode }) {

  const [openedCode, { close: closeCode, open: openCode }] =
    useDisclosure(false);
  const [openedQr, { close: closeQr, open: openQr }] = useDisclosure(false);
  const [qrCode, setQrCode] = useState<string>("");
  return (
    <QrContext.Provider
      value={{
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
    </QrContext.Provider>
  );
}
