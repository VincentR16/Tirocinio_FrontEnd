import type { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


const ProtectedRoot = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace/>
  }
  return children;
};
export default ProtectedRoot;
