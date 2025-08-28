import type { TermsResponse } from "../types/TermsResponse";
import type { TermsType } from "../types/TermsType";
import axios from "./axios";

export async function getTermsApi(
  query: string,
  type: TermsType,
  limit = 10
): Promise<TermsResponse[]> {
  if (!query || query.length < 1) return [];

  try {
    const response = await axios.get<TermsResponse[]>(
      `http://localhost:3000/terminologies/${type}`,
      {
        params: { query, limit },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching terms:", error);
    throw error; // TanStack Query gestirà l'errore
  }
}
