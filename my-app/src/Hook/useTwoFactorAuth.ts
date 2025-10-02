import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import type { TwoFactorRequest } from "../types/TwoFactorRequest";
import { twoFactorAuthApi } from "../api/twoFactorAuthApi";
import { useAuthContext } from "../context/AuthContext";

export default function useTwoFactorAuth() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setLoading } = useAuthContext();

  return useMutation({
    mutationFn: async (request: TwoFactorRequest) => {
      const res = await twoFactorAuthApi(request);

      setIsAuthenticated(true);
      navigate("/Medtrust");
      console.log("User Authenticated!", res);
    },
    onSuccess: () => {
      setLoading(false);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setIsAuthenticated(false);
        setLoading(false);
        if (err.response?.status === 401) {
          console.warn("Invalid 2FA code");
        }
        console.error(
          "Unexpected error:",
          err.response?.data?.message || err.message
        );
      } else {
        console.error("Unknown error:", err);
      }
    },
  });
}
