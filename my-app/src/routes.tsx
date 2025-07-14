import { WelcomeProvider } from "./hook/WelcomeProvider";
import { ScrollProvider } from "./hook/ScrollProvider";
import Welcome from "./pages/welcome/Welcome.page";
import { Navigate } from "react-router-dom";
import RootLayout from "./pages/rootLayout/RootLayout.page";
import Profile from "./pages/profile/Profile.page";
import Home from "./pages/home/Home.page";
import ProtectedRoot from "./utils/ProtectedRoot";

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
          <Welcome />
        </ScrollProvider>
      </WelcomeProvider>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoot>
        <RootLayout />
      </ProtectedRoot>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];
