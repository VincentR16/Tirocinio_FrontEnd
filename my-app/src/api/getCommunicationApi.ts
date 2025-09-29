import type { CommunicationType } from "../types/CommunicationType.enum";
import type { PaginatedCommunication } from "../types/PaginatedCommunication.type";
import api from "./axios";

export async function getCommunicationApi(
  type: CommunicationType,
  page: number
): Promise<PaginatedCommunication> {
  const response = await api.get<PaginatedCommunication>(
    `communication?type=${type}&page=${page}`
  );
  return response.data;
}
