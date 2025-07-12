import {  useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { logoutApi } from "../api/LogoutApi";

export default function useLogout() {
  const { setIsAuthenticated, setId, setRole } = useAuthContext();
  const navigate = useNavigate();

  return async () => {
    try {
      logoutApi();
      console.log("logout success");
    } catch (err) {
      console.log("Error", err);
    }

    setIsAuthenticated(false);
    setId("");
    setRole(undefined);

    navigate("/welcome");
  };
}
