import { registerApi } from "../api/registerApi";
import { useAuthContext } from "../context/AuthContext";
import type { RegisterRequest } from "../types/RegisterRequest.type";
import type { RegisterResponse } from "../types/RegisterResponse";

//setta lo user e restituisce il qrcode
export default function useRegister() {
  const { setUser, setLoading } = useAuthContext();
  return async (request: RegisterRequest): Promise<string | undefined> => {
    try {
      setLoading(true);
      const res: RegisterResponse = await registerApi(request);
    
      setLoading(false);
      setUser(res.user);

      console.log("register success", res);
      return res.qrCodeUrl;
    } catch (err) {
      console.log("error", err);
    }
  };
}
