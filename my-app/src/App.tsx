import "@mantine/core/styles.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes";

const Component = () => {
  const element = useRoutes(routes);
  return element;
};

import { MantineProvider } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider>
      {
        <Router>
          <Component />
        </Router>
      }
    </MantineProvider>
  );
}
