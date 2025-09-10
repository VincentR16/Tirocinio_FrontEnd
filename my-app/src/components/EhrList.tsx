import { Flex, Loader, Text } from "@mantine/core";
import { EhrCard } from "./EhrCard";
import type { PaginatedResponse } from "../types/PaginatedEhr.type";

interface EhrListPorps {
  isLoading: boolean
  error: Error | null
  data: PaginatedResponse | undefined
}

export function EhrList({ data,isLoading,error }: EhrListPorps) {

  if (isLoading) {
    return (
      <Flex
        mih="66vh"
        w="100%"
        mt="lg"
        direction="column"
        align="center"
        justify="center"
      >
        <Loader size="lg" />
        <Text mt="md">Caricamento EHR...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        mih="66vh"
        w="100%"
        mt="lg"
        direction="column"
        align="center"
        justify="center"
      >
        <Text c="red">Errore nel caricamento: {error.message}</Text>
      </Flex>
    );
  }

  return (
    <Flex
      mih="66vh"
      w="100%"
      mt="lg"
      direction="column"
      align="center"
      gap="lg"
    >
      {data?.ehr.map((ehr) => (
        <EhrCard
          key={ehr.id}
          name={
            ehr.patient?.name?.[0]?.given?.[0]?.toString() ||
            "Nome non disponibile"
          }
          surname={
            ehr.patient?.name?.[0]?.family?.toString() ||
            "Nome non disponibile"
          }
          email={
            ehr.patientEmail
          }
          date={ehr.createdAt.toString()}
        />
      ))}
    </Flex>
  );
}
