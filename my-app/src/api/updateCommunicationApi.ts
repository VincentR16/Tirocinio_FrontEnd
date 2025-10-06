import type { CommunicationStatus } from "../types/CommunicationStatus.enum";
import api from "./axios";

export async function updateCommunicationApi(
  id: string,
  status: CommunicationStatus
) {
  const response = await api.patch(`communication/${id}/status`, { status: status });
  return response.data;
}
