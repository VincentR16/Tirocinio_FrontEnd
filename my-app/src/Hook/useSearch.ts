import { useQuery } from "@tanstack/react-query";
import { getTermsApi } from "../api/getTermsApi";
import type { TermsType } from "../types/TermsType";

export default function useSearch(query: string, type: TermsType, enabled = true) {
  return useQuery({
    queryKey: ["search", query, type],
    queryFn: () => getTermsApi(query, type),
    enabled: Boolean(enabled && query && query.length >= 2),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
