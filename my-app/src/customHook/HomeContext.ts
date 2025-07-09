import { createContext, useContext } from "react";
import type { AuthType } from "../types/Auth.type";

type HomeContextType = {
  authType: AuthType;
  setAuthType: (type: AuthType) =>  void;
};

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined
);

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
}
