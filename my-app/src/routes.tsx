import { WelcomeProvider } from "./Hook/WelcomeProvider";
import { ScrollProvider } from "./Hook/ScrollProvider";
import Welcome from "./pages/welcome/Welcome.page";
import { Navigate } from "react-router-dom";
import RootLayout from "./pages/rootLayout/RootLayout.page";
import Profile from "./pages/profile/Profile.page";
import Home from "./pages/home/Home.page";

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
          <Welcome/>
        </ScrollProvider>
      </WelcomeProvider>
    ),
  },
  {
    path: "/home",
    element: <RootLayout/>,
    children: [
      {
        path: "", 
        element: <Home/>,
      },
      {
        path: "profile", 
        element: <Profile />,
      },
    ],
  },
];
