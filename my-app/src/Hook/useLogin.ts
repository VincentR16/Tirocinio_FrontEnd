import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/loginApi";
import type { LoginRequest } from "../types/LoginRequest.type";
import { useAuthContext } from "./AuthContext";
import { getMeApi } from "../api/getMeApi";

export default function useLogin() {
  const { setIsAuthenticated,setId, setRole } = useAuthContext();
  const navigate = useNavigate();

  return async (request: LoginRequest) => {
    try {
      const res = await loginApi(request);

      const user = await getMeApi();
      setId(user.id);
      setRole(user.role);
      setIsAuthenticated(true);
      
      console.log("login success", res);
      navigate("/home");
    } catch (err) {
      console.error("Login Error", err);
    }
  };
}
