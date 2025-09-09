import { Flex, Loader,Text } from "@mantine/core";
import usePagination from "../hook/usePagination";
import { EhrCard } from "./EhrCard";

interface EhrListPorps {
  query: string;
  page: number;
}

export function EhrList({ query, page }: EhrListPorps) {

  const { data, isLoading, error } = usePagination(query, page);
   
  if (isLoading) {
    return (
      <Flex mih="66vh" w="100%" mt="lg" direction="column" align="center" justify="center">
        <Loader size="lg" />
        <Text mt="md">Caricamento EHR...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex mih="66vh" w="100%" mt="lg" direction="column" align="center" justify="center">
        <Text c="red">Errore nel caricamento: {error.message}</Text>
      </Flex>
    );
  }

    return (
    <Flex mih="66vh" w="100%" mt="lg" direction="column" align="center" gap="lg">
      {data?.ehr.map((ehr) => (
        <EhrCard key={ehr.id}/>
      ))}
    </Flex>
  );

}
