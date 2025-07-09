import { useState, type ReactNode } from "react";
import { HomeContext } from "./HomeContext";
import { AuthTypeEnum, type AuthType } from "../types/Auth.type";

export function HomeProvider({ children }: { children: ReactNode }) {
  const [authType, setAuthType] = useState<AuthType>(AuthTypeEnum.LOGIN);
  return (
    <HomeContext.Provider value={{ authType, setAuthType }}>
      {children}
    </HomeContext.Provider>
  );
}
