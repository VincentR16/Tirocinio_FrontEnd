import { createContext, useContext } from "react";
import type { AuthType } from "../types/Auth.type";

type HomeContextType = {
  authType: AuthType;
  setAuthType: (type: AuthType) =>  void;
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
