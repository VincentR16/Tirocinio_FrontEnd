import { WelcomeProvider } from "./customHook/WelcomeProvider";
import { ScrollProvider } from "./customHook/ScrollProvider";
import Welcome from "./pages/welcomePage/Welcome";
import { Navigate } from "react-router-dom";
import Home from "./pages/homePage/HomePage";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/welcome" />,
  },
  {
    path: "/welcome",
    element: (
      <WelcomeProvider>
        <ScrollProvider>
          <Welcome></Welcome>
        </ScrollProvider>
      </WelcomeProvider>
    ),
  },
  {
    path: "/home",
    element: <Home></Home>
  }
];
