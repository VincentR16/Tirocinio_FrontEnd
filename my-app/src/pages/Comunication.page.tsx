import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Loader,
  Pagination,
  Paper,
  SegmentedControl,
  Table,
  Text,
  Tooltip,
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
import type { ComunicationStatus } from "../types/ComunicationStatus.enum";
import { useJsonContext } from "../context/JsonContext";

interface StatusDotProps {
  status: ComunicationStatus;
  size?: number;
}

function StatusDot({ status }: StatusDotProps) {
  const statusConfig: Record<
    ComunicationStatus,
    {
      color: string;
      label: string;
    }
  > = {
    Pending: {
      color: "orange",
      label: "Pending",
    },
    Delivered: {
      color: "green",
      label: "Delivered",
    },
    Failed: {
      color: "red",
      label: "Failed",
    },
    Received: {
      color: "green",
      label: "Received",
    },
    Cancelled: {
      color: "black",
      label: "Cancelled",
    },
  };

  const config = statusConfig[status];

  return (
    <Tooltip label={config.label} withArrow>
      <Center>
        <Box
          p={5}
          style={{
            cursor: "pointer",
            border: "1px solid var(--mantine-color-gray-6)",
            borderRadius: "50%",
            backgroundColor: `var(--mantine-color-${config.color}-6)`,
          }}
        />
      </Center>
    </Tooltip>
  );
}

export default function ComunicationPage() {
  const [valueType, setValueType] = useState<ComunicationType>(
    ComunicationTypeEnum.OUTGOING
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetComunication(valueType, currentPage);
  const { openModal, setJson } = useJsonContext();

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
        <Table.Td>
          <Text fw={500}>{row.hospital}</Text>
        </Table.Td>
        <Table.Td ta="center">
          <StatusDot status={row.status}></StatusDot>
        </Table.Td>
        <Table.Td ta="center">
          <Tooltip label="View the code" position="top" withArrow>
            <ActionIcon
              variant="subtle"
              color="blue"
              size="lg"
              onClick={() => {
                console.log("ecco", row.message);
                setJson(row.message);
                openModal();
              }}
            >
              <IconClipboard size={24} />
            </ActionIcon>
          </Tooltip>
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
          <Paper
            p={15}
            mt={30}
            shadow="md"
            radius="lg"
            withBorder
            style={{
              overflow: "hidden",
            }}
          >
            <Table.ScrollContainer minWidth={800}>
              <Table verticalSpacing="xs" highlightOnHover striped>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Comunication Id</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>From:</Table.Th>
                    <Table.Th>To:</Table.Th>
                    <Table.Th ta="center">Status</Table.Th>
                    <Table.Th ta="center">JSON Response</Table.Th>
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
