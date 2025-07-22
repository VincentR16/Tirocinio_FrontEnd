import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { logoutApi } from "../api/logoutApi";

export default function useLogout() {
  const { setIsAuthenticated, setUser } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await logoutApi();
    },
    onSuccess: () => {
      console.log("Logout success");
      setIsAuthenticated(false);
      setUser(undefined);
      navigate("/welcome");
    },
    onError: (error) => {
      console.error("Logout error", error);
    },
  });
}
