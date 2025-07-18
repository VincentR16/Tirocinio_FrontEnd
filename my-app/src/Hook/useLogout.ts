import {  useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { logoutApi } from "../api/logoutApi";

export default function useLogout() {
  const { setIsAuthenticated,setUser } = useAuthContext();
  const navigate = useNavigate();

  return async () => {
    try {
      logoutApi();
      console.log("logout success");
    } catch (err) {
      console.error("Logout Error", err);
    }

    setIsAuthenticated(false);
    setUser(undefined)
   
    navigate("/welcome");
  };
}
