import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getMeApi } from "../api/getMeApi";

export default function usePersistentLogin() {
  const { setId, setIsAuthenticated, setRole } = useAuthContext();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await getMeApi();
        setId(user.id);
        setRole(user.role);
        setIsAuthenticated(true);
      } catch (err) {
        console.log("User not logged", err);
      }
    };
    checkLogin();
  });
}
