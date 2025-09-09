import type { EHR } from "./Ehr.types";

export interface PaginatedResponse {
  ehr: EHR[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
