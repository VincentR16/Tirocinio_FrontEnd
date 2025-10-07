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
import { IconCircleArrowDownRight, IconSend } from "@tabler/icons-react";
import classes from "./style/comunication.module.css";
import { useState } from "react";
import {
  CommunicationTypeEnum,
  type CommunicationType,
} from "../types/CommunicationType.enum";
import useGetCommunication from "../hook/useGetCommunication";
import { CommunicationTable } from "../components/CommunicationTable";

export default function CommunicationPage() {
  const [valueType, setValueType] = useState<CommunicationType>(
    CommunicationTypeEnum.OUTGOING
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetCommunication(
    valueType,
    currentPage
  );
  const rows = CommunicationTable({ data });

  return (
    <Flex
      direction="column"
      mih="100%"
      h="100%"
      w="100%"
      justify="space-between"
    >
      <Center>
        <SegmentedControl
          radius="md"
          value={valueType}
          onChange={(value) => {
            setValueType(value as CommunicationType);
            setCurrentPage(1);
          }}
          className={classes.segmentRoot}
          size="md"
          styles={{
            indicator: {
              backgroundColor: "#228be6",
            },
          }}
          data={[
            {
              value: CommunicationTypeEnum.OUTGOING,
              label: (
                <Center style={{ gap: 10 }}>
                  <IconSend
                    color={
                      valueType === CommunicationTypeEnum.OUTGOING
                        ? "white"
                        : "black"
                    }
                    size={16}
                  />
                  <Text
                    c={
                      valueType === CommunicationTypeEnum.OUTGOING
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
                      valueType === CommunicationTypeEnum.INCOMING
                        ? "white"
                        : "black"
                    }
                    size={16}
                  />
                  <Text
                    c={
                      valueType === CommunicationTypeEnum.INCOMING
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
      </Center>

      {error && (
        <Center>
          <Text c="red">
            {error.message ||
              "Si è verificato un errore nel caricamento dei dati"}
          </Text>
        </Center>
      )}
      {rows?.length == 0 ? (
        <Center mt={250}>
          <Text size="lg" fs="italic" fw={600} c="grey">
            No communication received yet.
          </Text>
        </Center>
      ) : (
        <>
          {isLoading ? (
            <Center h={400}>
              <Loader size="lg" />
            </Center>
          ) : (
            <Flex direction="column" mih="72.5vh">
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
                  <Table
                    verticalSpacing="xs"
                    highlightOnHover
                    striped
                    style={{
                      cursor: "default",
                      outline: "none",
                    }}
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Patient Name</Table.Th>
                        <Table.Th>Patient Surname</Table.Th>
                        <Table.Th>Ehr Id</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>From:</Table.Th>
                        <Table.Th>To:</Table.Th>
                        <Table.Th ta="center">Status</Table.Th>
                        <Table.Th ta="center">JSON</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Paper>
            </Flex>
          )}
          <Center mt="auto" py="md">
            <Pagination
              value={currentPage}
              onChange={setCurrentPage}
              total={data?.pagination?.totalPages || 1}
            ></Pagination>
          </Center>
        </>
      )}
    </Flex>
  );
}
