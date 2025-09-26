import {
  Center,
  Flex,
  Loader,
  Pagination,
  Paper,
  SegmentedControl,
  Table,
  Text,
} from "@mantine/core";
import {
  IconCircleArrowDownRight,
  IconClipboard,
  IconSend,
} from "@tabler/icons-react";
import classes from "./style/comunication.module.css";
import { useState } from "react";
import {
  ComunicationTypeEnum,
  type ComunicationType,
} from "../types/ComunicationType.enum";
import useGetComunication from "../hook/useGetComunication";

export default function ComunicationPage() {
  const [valueType, setValueType] = useState<ComunicationType>(
    ComunicationTypeEnum.OUTGOING
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetComunication(valueType, currentPage);
  console.log("ecco user", data?.comunications[0].doctor);

  const rows = data?.comunications.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>{row.id}</Table.Td>
        <Table.Td>
          <Text>{row.createdAt.toString()}</Text>
        </Table.Td>
        <Table.Td>
          {row.doctor.user.name} {row.doctor.user.surname}
        </Table.Td>
        <Table.Td>{row.hospital}</Table.Td>
        <Table.Td>{row.status}</Table.Td>
        <Table.Td>
          <Center>
            <IconClipboard />
          </Center>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Flex mih="89vh" direction="column" w="100%">
      <Center>
        <Paper p={4} radius="lg" shadow="lg">
          <SegmentedControl
            value={valueType}
            onChange={(value) => setValueType(value as ComunicationType)}
            className={classes.segmentRoot}
            size="md"
            styles={{
              indicator: {
                backgroundColor: "#228be6",
              },
            }}
            data={[
              {
                value: ComunicationTypeEnum.OUTGOING,
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconSend
                      color={
                        valueType === ComunicationTypeEnum.OUTGOING
                          ? "white"
                          : "black"
                      }
                      size={16}
                    />
                    <Text
                      c={
                        valueType === ComunicationTypeEnum.OUTGOING
                          ? "white"
                          : "black"
                      }
                    >
                      Outgoing
                    </Text>
                  </Center>
                ),
              },
              {
                value: "Incoming",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconCircleArrowDownRight
                      color={
                        valueType === ComunicationTypeEnum.INCOMING
                          ? "white"
                          : "black"
                      }
                      size={16}
                    />
                    <Text
                      c={
                        valueType === ComunicationTypeEnum.INCOMING
                          ? "white"
                          : "black"
                      }
                    >
                      Incoming
                    </Text>
                  </Center>
                ),
              },
            ]}
          />
        </Paper>
      </Center>

      {error && (
        <Center>
          <Text c="red">
            {error.message ||
              "Si è verificato un errore nel caricamento dei dati"}
          </Text>
        </Center>
      )}

      {isLoading ? (
        <Center h={400}>
          <Loader size="lg" />
        </Center>
      ) : (
        <>
          <Paper p={15} mt={30} shadow="md" radius="lg">
            <Table.ScrollContainer minWidth={800}>
              <Table verticalSpacing="xs">
                <Table.Thead>
                  <Table.Tr>
                    
                    <Table.Th>Comunication Id</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>From:</Table.Th>
                    <Table.Th>To:</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Message</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Paper>
        </>
      )}
      <Center mt="auto" py="md">
        <Pagination

          value={currentPage}
          onChange={setCurrentPage}
          total={data?.pagination?.totalPages || 1}
        ></Pagination>
      </Center>
    </Flex>
  );
}

                    //! al posto di id mettere nome e cognome paziente e id ehr aggiustare prima il back end
