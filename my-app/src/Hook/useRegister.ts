import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/registerApi";
import type { RegisterRequest } from "../types/RegisterRequest.type";

export default function useRegister() {
  const navigate = useNavigate();

  return async (request: RegisterRequest) => {
    try {
      const res = await registerApi(request);
      console.log("register success", res);
      navigate("/home");
    } catch (err) {
      console.log("error", err);
    }
  };
}
