import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./Routes";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthProvider";
import { Notifications } from "@mantine/notifications";

const Component = () => {
  const element = useRoutes(routes);
  return element;
};

export default function App() {
  return (
    <MantineProvider>
      <Notifications />
      <Router>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}
