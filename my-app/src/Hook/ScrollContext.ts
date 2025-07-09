import { createContext, useContext } from "react";

type ScrollContextType = {
  scrollToLogin: () => void;
  scrollToAbout: () => void;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  loginRef: React.RefObject<HTMLDivElement | null>;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context)
    throw new Error("useScrollContext must be used within ScrollProvider");
  return context;
}
