import { QrProvider } from "./context/QrProvider";
import { ScrollProvider } from "./context/ScrollProvider";
import Welcome from "./pages/Welcome.page";
import RootLayout from "./pages/RootLayout.page";
import Profile from "./pages/Profile.page";
import Home from "./pages/Home.page";
import ProtectedRoot from "./utils/ProtectedRoot";
import InitialRedirect from "./utils/InitialRedirect";
import EhrForm from "./pages/EhrForm.page";
import { EhrProvider } from "./context/EhrProvider";
import TwoFactorAuthPage from "./pages/TwoFactorAuth.page";
import { SendProvider } from "./context/SendProvider";
import ComunicationPage from "./pages/Comunication.page";

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
    path: "/Medtrust",
    element: (
      <SendProvider>
        <ProtectedRoot>
          <RootLayout />
        </ProtectedRoot>
      </SendProvider>
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
        path: "create-Ehr",
        element: (
          <EhrProvider>
            <EhrForm />
          </EhrProvider>
        ),
      },
      {
        path: "two-factor-auth",
        element: <TwoFactorAuthPage />,
      },
      {
        path: "comunication-history",
        element: <ComunicationPage />,
      },
    ],
  },
];
