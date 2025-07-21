import api from "./axios";
import type { TwoFactorRequest } from "../types/TwoFactorRequest";

export async function twoFactorAuthApi(data: TwoFactorRequest) {
  const response = await api.post("/auth/2FA", data);
  return response.data;
}
