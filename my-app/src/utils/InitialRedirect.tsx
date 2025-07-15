import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import usePersistentLogin from "../hook/usePersistentLogin";
import { Flex, Loader } from "@mantine/core";

export default function InitialRedirect() {
  //uso hook per vedere se ci sono ancora refresh e access token
  usePersistentLogin();
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading)
    return (
      <Flex justify="center" align="center" h="100vh" w="100%">
        <Loader color="blue" />
      </Flex>
    );

  //se l utente ha ancora questi token e sono validi viene renderizzaro in home altrimenti in welcome dove fare il login
  return <Navigate to={isAuthenticated ? "/home" : "/welcome"} replace />;
}
