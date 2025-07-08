import { createContext, useContext } from "react";
import type { RoleType } from "../types/Role.types";

type AuthContextType = {
  id: number;
  setId: (id:number) => void;
  email: string;
  setEmail: (email:string) => void;
  role: RoleType;
  setRole: (role: RoleType) => void;
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


//todo da finire di implementare