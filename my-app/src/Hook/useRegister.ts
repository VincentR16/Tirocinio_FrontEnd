import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/registerApi";
import type { RegisterRequest } from "../types/RegisterRequest.type";
import { getMeApi } from "../api/getMeApi";
import { useAuthContext } from "../context/AuthContext";

export default function useRegister() {
  const { setUser, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  return async (request: RegisterRequest) => {
    try {
      const res = await registerApi(request);

      const user = await getMeApi();
      setUser(user);
      setIsAuthenticated(true);

      console.log("register success", res);

      navigate("/home");
    } catch (err) {
      console.log("error", err);
    }
  };
}
