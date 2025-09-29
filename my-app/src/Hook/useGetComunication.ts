import { useQuery } from "@tanstack/react-query";
import { getCommunicationApi } from "../api/getComunicationApi";
import type { CommunicationType } from "../types/CommunicationType.enum";

export default function useGetCommunication(
  type: CommunicationType,
  page: number
) {
  return useQuery({
    queryKey: ["comuinication", type, page],
    queryFn: () => getCommunicationApi(type, page),
  });
}
