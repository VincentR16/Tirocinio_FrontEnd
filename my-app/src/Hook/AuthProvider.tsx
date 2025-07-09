import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { RoleTypeEnum, type RoleType } from "../types/Role.type";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [email,setEmail] = useState("");
    const [id,setId] = useState(0);
    const [role,setRole] = useState<RoleType>(RoleTypeEnum.PATIENT)

  return (
    <AuthContext.Provider value={{id,email,role,setId,setEmail,setRole}}>{children}</AuthContext.Provider>
  );
}
