import { useNavigate } from "react-router-dom";
import type { TwoFactorRequest } from "../types/TwoFactorRequest";
import { twoFactorAuthApi } from "../api/twoFactorAuthApi";
import { useAuthContext } from "../context/AuthContext";
import { isAxiosError } from "axios";

export default function useTwoFactorAuth() {
  const navigate = useNavigate();
  const { setIsAuthenticated,setLoading } = useAuthContext();

  return async (
    request: TwoFactorRequest
  ): Promise<"success" | "invalid" | "error"> => {
    try {
      setLoading(true)
      const res = await twoFactorAuthApi(request);
      setLoading(false)
      setIsAuthenticated(true);

      console.log("User Authenticated!", res);
      navigate("/home");
      return "success";
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          console.warn("Invalid 2FA code");
          return "invalid";
        }

        console.error(
          "Unexpected error:",
          err.response?.data?.message || err.message
        );
        return "error";
      }

      console.error("Unknown error:", err);
      return "error";
    }
  };
}
