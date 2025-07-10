import type { LoginRequest } from "../types/LoginRequest.type";
import axios from "../Axios";

export async function loginApi(data: LoginRequest) {
  const response = axios.post("/auth/login", data);
  return response;
}
