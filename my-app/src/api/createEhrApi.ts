import type { EhrRequest } from "../types/EhrRequest";
import api from "./axios";

export async function createEhrApi(ehr: EhrRequest) {
  const response = await api.post("ehr/create", ehr);
  return response.data;
}
