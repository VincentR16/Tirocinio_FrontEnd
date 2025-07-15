import { WelcomeProvider } from "./context/WelcomeProvider";
import { ScrollProvider } from "./context/ScrollProvider";
import Welcome from "./pages/welcome/Welcome.page";
import RootLayout from "./pages/rootLayout/RootLayout.page";
import Profile from "./pages/profile/Profile.page";
import Home from "./pages/home/Home.page";
import ProtectedRoot from "./utils/ProtectedRoot";
import InitialRedirect from "./utils/InitialRedirect";

export const routes = [
  {
    path: "/",
    element: <InitialRedirect/>,
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
