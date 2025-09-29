import type { Communication } from "./Communication.type";

export type PaginatedCommunication = {
  comunications: Communication[];
  pagination: {
    currentPage: number;
    itemPerPage: number;
    totalPages: number;
    hasNextPage: number;
    hasPreviusPage: number;
  };
};
