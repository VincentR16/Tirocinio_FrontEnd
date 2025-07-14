import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function InitialRedirect() {
  const { isAuthenticated } = useAuthContext();

  return <Navigate to={isAuthenticated ? "/home" : "/welcome"} replace />;
}