import type { PaginatedResponse } from "../types/PaginatedEhr.type";
import api from "./axios";

export async function paginatedEhrApi(
  query: string,
  page: number
): Promise<PaginatedResponse> {
  const response = await api.get<PaginatedResponse>(
    `ehr/doctor?page=${page}&search=${query}`
  );
  return response.data;
}
