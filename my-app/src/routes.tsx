import { HomeProvider } from "./customHook/HomeProvider";
import { ScrollProvider } from "./customHook/ScrollProvider";
import Home from "./pages/Home/Home";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: (
      <HomeProvider>
        <ScrollProvider>
          <Home></Home>
        </ScrollProvider>
      </HomeProvider>
    ),
  },
];
