import { useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types/User.type";


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
