import {createContext, type ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const HomeContext = createContext(undefined);

export function HomeProvider({ children }: { children: ReactNode }) {
  return <HomeContext.Provider value={undefined}>
    {children}
  </HomeContext.Provider>;
}
