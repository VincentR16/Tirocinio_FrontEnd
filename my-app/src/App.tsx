import "@mantine/core/styles.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { MantineProvider } from "@mantine/core";

const Component = () => {
  const element = useRoutes(routes);
  return element;
};



export default function App() {
  return (
    <MantineProvider>
        <Router>
          <Component />
        </Router>
    </MantineProvider>
  );
}
