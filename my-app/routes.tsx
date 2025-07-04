import Home from "./src/pages/Home/Home";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
];
