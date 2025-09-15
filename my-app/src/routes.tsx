import { QrProvider } from "./context/QrProvider";
import { ScrollProvider } from "./context/ScrollProvider";
import Welcome from "./pages/Welcome.page";
import RootLayout from "./pages/RootLayout.page";
import Profile from "./pages/Profile.page";
import Home from "./pages/Home.page";
import ProtectedRoot from "./utils/ProtectedRoot";
import InitialRedirect from "./utils/InitialRedirect";
import CreateEhr from "./pages/CreateEhr.page";
import { EhrProvider } from "./context/EhrProvider";

export const routes = [
  {
    path: "/",
    element: <InitialRedirect />,
  },
  {
    path: "/welcome",
    element: (
      <QrProvider>
        <ScrollProvider>
          <Welcome />
        </ScrollProvider>
      </QrProvider>
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
      {
        path: "ehr/create",
        element: (
          <EhrProvider>
            <CreateEhr />
          </EhrProvider>
        ),
      },
    ],
  },
];
