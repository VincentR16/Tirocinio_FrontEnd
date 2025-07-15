import { useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { type RoleType } from "../types/Role.type";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string>("");
  const [role, setRole] = useState<RoleType>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true)

  return (
    <AuthContext.Provider
      value={{ id, role, isAuthenticated,isLoading,setLoading, setIsAuthenticated, setId, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
