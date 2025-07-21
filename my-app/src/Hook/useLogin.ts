import { loginApi } from "../api/loginApi";
import { useAuthContext } from "../context/AuthContext";
import type { LoginRequest } from "../types/LoginRequest.type";

export default function useLogin() {
   const {setLoading, setUser} = useAuthContext();

  return async (request: LoginRequest) => {
    try {
      setLoading(true);
      const res = await loginApi(request);
      setLoading(false);
      setUser(res);

      console.log("Login success", res);
      return res;
    } catch (err) {
      console.error("Login Error", err);
    }
  };
}
