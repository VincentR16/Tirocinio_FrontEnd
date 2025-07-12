import axios from "./Axios";

export async function logoutApi() {
  const response = await axios.post("/auth/logout");
  return response;
}
