import "@mantine/core/styles.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./Routes";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthProvider";
import usePersistentLogin from "./hook/usePersistentLogin";

const Component = () => {
  usePersistentLogin();
  const element = useRoutes(routes);
  return element;
};

export default function App() {

  return (
    <MantineProvider>
      <Router>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}
