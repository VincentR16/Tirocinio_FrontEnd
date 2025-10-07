import {
  Tooltip,
  ActionIcon,
  Center,
  Table,
  Box,
  Text,
  Group,
} from "@mantine/core";
import { IconClipboard, IconCheck, IconX } from "@tabler/icons-react";
import type { Bundle, Patient } from "fhir/r4";
import {
  CommunicationStatusEnum,
  type CommunicationStatus,
} from "../types/CommunicationStatus.enum";
import { CommunicationTypeEnum } from "../types/CommunicationType.enum";
import { useJsonContext } from "../context/JsonContext";
import useUpdateCommunication from "../hook/useUpdateCommunication";
import type { PaginatedCommunication } from "../types/PaginatedCommunication.type";

interface StatusDotProps {
  status: CommunicationStatus;
  size?: number;
}

function StatusDot({ status }: StatusDotProps) {
  const statusConfig: Record<
    CommunicationStatus,
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
      color: "red",
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface communicationTableProps {
  data: PaginatedCommunication | undefined;
}

export function CommunicationTable({ data }: communicationTableProps) {
  const { openModal, setJson } = useJsonContext();
  const update = useUpdateCommunication();

  const rows = data?.comunications.map((row) => {
    const bundle = row.message as Bundle;
    const patient = bundle.entry?.[0]?.resource as Patient | undefined;
    const name =
      row.ehr?.patient?.name?.[0]?.given?.[0]?.toString() ??
      patient?.name?.[0]?.given?.[0]?.toString();
    const surname =
      row.ehr?.patient?.name?.[0]?.family?.toString() ??
      patient?.name?.[0]?.family?.toString();
    const communicationFrom =
      row.type === CommunicationTypeEnum.OUTGOING
        ? `${row.doctor?.user?.name ?? "N/A"} ${
            row.doctor?.user?.surname ?? "N/A"
          }`
        : row.hospital ?? "N/A";
    const communicationTo =
      row.type === CommunicationTypeEnum.OUTGOING
        ? row.hospital ?? "N/A"
        : `${row.doctor?.user?.name ?? ""} ${
            row.doctor?.user?.surname ?? "N/A"
          }`;

    return (
      <Table.Tr
        key={row.id}
        style={{
          cursor: "default", 
          outline: "none", 
        }}
      >
        <Table.Td>
          <Text>{name}</Text>
        </Table.Td>
        <Table.Td>
          <Text>{surname}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{row.ehr?.id ?? "N/A"}</Text>
        </Table.Td>
        <Table.Td>
          <Text fw="lighter">{formatDate(row.createdAt.toString())}</Text>
        </Table.Td>
        <Table.Td>
          <Text>{communicationFrom}</Text>
        </Table.Td>
        <Table.Td>
          <Text>{communicationTo}</Text>
        </Table.Td>
        <Table.Td ta="center">
          <StatusDot status={row.status}></StatusDot>
        </Table.Td>
        <Table.Td ta="center">
          <Tooltip label="View the code" position="top" withArrow>
            <ActionIcon
              variant="subtle"
              size="lg"
              color="blue"
              onClick={() => {
                setJson(row.message);
                openModal();
              }}
            >
              <IconClipboard size={24} />
            </ActionIcon>
          </Tooltip>
        </Table.Td>
        {row.type === CommunicationTypeEnum.INCOMING && (
          <Table.Td ta="center">
            {row.status === CommunicationStatusEnum.PENDING && (
              <Group justify="center">
                <Tooltip label="Accept" position="top" withArrow>
                  <ActionIcon
                    color="green"
                    variant="subtle"
                    onClick={() => {
                      update.mutate({
                        id: row.id,
                        status: CommunicationStatusEnum.RECEIVED,
                      });
                    }}
                  >
                    <IconCheck size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Reject" position="top" withArrow>
                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => {
                      update.mutate({
                        id: row.id,
                        status: CommunicationStatusEnum.CANCELLED,
                      });
                    }}
                  >
                    <IconX size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            )}
            {row.status === CommunicationStatusEnum.RECEIVED && (
              <Center>
                <Tooltip label="Accepted" position="top" withArrow>
                  <IconCheck size={20} color="green" />
                </Tooltip>
              </Center>
            )}
            {row.status === CommunicationStatusEnum.CANCELLED && (
              <Center>
                <Tooltip label="Rejected" position="top" withArrow>
                  <IconX size={20} color="red" />
                </Tooltip>
              </Center>
            )}
          </Table.Td>
        )}
      </Table.Tr>
    );
  });

  return rows;
}
