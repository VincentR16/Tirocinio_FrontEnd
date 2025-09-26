import { useQuery } from "@tanstack/react-query";
import { getComunicationApi } from "../api/getComunicationApi";
import type { ComunicationType } from "../types/ComunicationType.enum";

export default function useGetComunication(
  type: ComunicationType,
  page: number
) {
  return useQuery({
    queryKey: ["comuinication", type, page],
    queryFn: () => getComunicationApi(type, page),
  });
}
