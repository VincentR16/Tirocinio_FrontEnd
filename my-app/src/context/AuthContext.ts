import { createContext, useContext } from "react";
import type { User } from "../types/User.type";


type AuthContextType = {
    //serve per gestire componente login e i suoi campi

  user: User | undefined;
  setUser: (obj: User| undefined) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (flag: boolean) => void;
  isLoading: boolean; 
  setLoading: (flag: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContect must be used within a AuthProvider");

  return context;
}
