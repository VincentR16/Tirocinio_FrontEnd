import type { Comunication } from "./Comunication.type";

export type PaginatedComunication = {
  comunications: Comunication[];
  pagination: {
    currentPage: number;
    itemPerPage: number;
    totalPages: number;
    hasNextPage: number;
    hasPreviusPage: number;
  };
};
