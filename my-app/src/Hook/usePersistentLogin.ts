import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getMeApi } from "../api/getMeApi";

export default function usePersistentLogin() {
  const { setUser, setIsAuthenticated, setLoading } = useAuthContext();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        //imposto il caricamento
        setLoading(true);

        //provo una getMe sull utente
        const user = await getMeApi();

        //setto i dati recuperati
        setUser(user);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); //fine loading
      }
    };
    checkLogin();
  }, [setIsAuthenticated, setLoading, setUser]);
}
