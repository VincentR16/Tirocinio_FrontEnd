import { useState, type ReactNode } from "react";
import { WelcomeContext } from "../context/WelcomeContext";
import { AuthTypeEnum, type AuthType } from "../types/Auth.type";

export function WelcomeProvider({ children }: { children: ReactNode }) {
  const [authType, setAuthType] = useState<AuthType>(AuthTypeEnum.LOGIN);
  return (
    <WelcomeContext.Provider value={{ authType, setAuthType }}>
      {children}
    </WelcomeContext.Provider>
  );
}
