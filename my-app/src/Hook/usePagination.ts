import { useQuery } from "@tanstack/react-query";
import { paginatedEhrApi } from "../api/paginationEhrApi";


export default function usePagination(query: string, page: number){
    return useQuery({
        queryKey:  ['ehr',query,page],
        queryFn: () => paginatedEhrApi(query,page)
    })

}