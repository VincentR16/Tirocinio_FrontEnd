import { Tooltip, ActionIcon } from "@mantine/core";
import { IconClipboard, IconCheck, IconX } from "@tabler/icons-react";
import type { Bundle, Patient } from "fhir/r4";
import { Table, Group } from "lucide-react";
import { data } from "react-router-dom";
import type { CommunicationStatusEnum } from "../types/CommunicationStatus.enum";
import type { CommunicationTypeEnum } from "../types/CommunicationType.enum";

export function CommunicationTable() {
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
      <Table.Tr key={row.id}>
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
                console.log("ecco", row.message);
                setJson(row.message);
                openModal();
              }}
            >
              <IconClipboard size={24} />
            </ActionIcon>
          </Tooltip>
        </Table.Td>
        {row.type === CommunicationTypeEnum.INCOMING &&
          row.status === CommunicationStatusEnum.PENDING && (
            <Table.Td ta="center">
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
            </Table.Td>
          )}
      </Table.Tr>
    );
  });
}
