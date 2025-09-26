import type { ComunicationType } from "../types/ComunicationType.enum";
import type { PaginatedComunication } from "../types/PaginatedComunication.type";
import api from "./axios";

export async function getComunicationApi(
  type: ComunicationType,
  page: number
): Promise<PaginatedComunication> {
  const response = await api.get<PaginatedComunication>(
    `comunication?type=${type}&page=${page}`
  );
  return response.data;
}
