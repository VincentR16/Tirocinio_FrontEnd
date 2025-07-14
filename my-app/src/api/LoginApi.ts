import type { LoginRequest } from "../types/LoginRequest.type";
import api from "./axios";


export async function loginApi(data: LoginRequest) {
  const response = await api.post("/auth/login", data);
  return response;
}
    