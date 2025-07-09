import { WelcomeProvider } from "./customHook/WelcomeProvider";
import { ScrollProvider } from "./customHook/ScrollProvider";
import Welcome from "./pages/welcomePage/Welcome";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: (
      <WelcomeProvider>
        <ScrollProvider>
          <Welcome></Welcome>
        </ScrollProvider>
      </WelcomeProvider>
    ),
  },
  {
    path: "/firstPage"
  }
];
