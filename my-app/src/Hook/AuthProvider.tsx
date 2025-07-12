import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { type RoleType } from "../types/Role.type";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [id,setId] = useState("");
    const [role,setRole] = useState<RoleType>(undefined)

  return (
    <AuthContext.Provider value={{id,role,setId,setRole}}>{children}</AuthContext.Provider>
  );
}
