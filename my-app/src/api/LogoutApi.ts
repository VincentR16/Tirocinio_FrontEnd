import axios from "./Axios";

export function logoutApi() {
  const response = axios.post("/auth/logout");
  return response;
}
