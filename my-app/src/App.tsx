import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./Routes";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthProvider";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const Component = () => {
  const element = useRoutes(routes);
  return element;
};

export default function App() {
  return (

    <MantineProvider>
      <QueryClientProvider client={queryClient}>
      <Notifications />
      <Router>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </Router>
      </QueryClientProvider>
    </MantineProvider>
  );
}
