import { ScrollContext } from "./ScrollContext";
import { type ReactNode, useRef } from "react";

export function ScrollProvider({ children }: { children: ReactNode }) {
  const loginRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToLogin = () => {
    loginRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <ScrollContext.Provider value={{scrollToLogin,scrollToAbout,aboutRef,loginRef}}>
        {children}
    </ScrollContext.Provider>
  )
}
