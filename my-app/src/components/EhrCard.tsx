import {
  ActionIcon,
  Badge,
  Center,
  Divider,
  Flex,
  Group,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconCalendar,
  IconClipboardText,
  IconFileTypePdf,
  IconMail,
  IconStethoscope,
  IconUser,
  IconSend,
} from "@tabler/icons-react";
import classes from "./style/EhrCard.module.css";
import usePdf from "../hook/usePdf";
import type { EHR } from "../types/Ehr.types";
import { useSendContext } from "../context/SendContext";
interface EhrCardProps {
  ehr: EHR;
  id: string;
  email: string;
  name: string;
  surname: string;
  date: string;
  doctorName: string;
  doctorSurname: string;
}

export function EhrCard({
  id,
  email,
  name,
  surname,
  date,
  doctorName,
  doctorSurname,
}: EhrCardProps) {
  const downloadPdfMutation = usePdf();
  const { setName, setSurname, setId, openModal } = useSendContext();

  return (
    <Paper
      shadow="xs"
      className={classes.ehrCard}
      withBorder
      p="lg"
      radius="lg"
      mah="90px"
      style={{
        width: "100%",
        maxWidth: "1200px",
        transition: "all 0.2s ease",
      }}
    >
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        w="100%"
        gap="md"
      >
        <Flex align="center" gap="xs" style={{ flexShrink: 0 }}>
          <Paper
            radius="md"
            p="sm"
            bg="blue.0"
            style={{
              border: "1px solid var(--mantine-color-blue-2)",
            }}
          >
            <Center>
              <IconClipboardText
                color="var(--mantine-color-blue-6)"
                strokeWidth={1.5}
                size="24px"
              />
            </Center>
          </Paper>

          <Divider orientation="vertical" size="xs" color="gray.3" />
        </Flex>

        <Flex
          direction="row"
          align="center"
          gap="md"
          style={{ flex: 1, minWidth: 0 }}
        >
          <Flex direction="column" gap="xs" style={{ minWidth: 140 }}>
            <Flex align="center" gap="xs">
              <IconUser size={16} color="var(--mantine-color-gray-6)" />
              <Text size="sm" fw={600} c="gray.7">
                Patient
              </Text>
            </Flex>
            <Text size="sm" fw={500} truncate="end">
              {name} {surname}
            </Text>
          </Flex>

          <Flex direction="column" gap="xs" style={{ minWidth: 180 }}>
            <Flex align="center" gap="xs">
              <IconMail size={16} color="var(--mantine-color-gray-6)" />
              <Text size="sm" miw="180px" fw={600} c="gray.7">
                Email
              </Text>
            </Flex>
            <Text size="sm" c="dimmed" truncate="end">
              {email}
            </Text>
          </Flex>

          <Flex direction="column" gap="xs" style={{ minWidth: 120 }}>
            <Flex align="center" gap="xs">
              <IconCalendar size={16} color="var(--mantine-color-gray-6)" />
              <Text size="sm" fw={600} c="gray.7">
                Created on
              </Text>
            </Flex>
            <Center>
              <Text size="sm" c="dimmed">
                {new Date(date).toLocaleDateString("it-IT")}
              </Text>
            </Center>
          </Flex>

          <Flex direction="column" gap="xs" style={{ minWidth: 140 }}>
            <Flex align="center" gap="xs">
              <IconStethoscope size={16} color="var(--mantine-color-gray-6)" />
              <Text size="sm" fw={600} c="gray.7">
                Doctor
              </Text>
            </Flex>
            <Badge variant="light" color="green" size="sm" radius="sm">
              Dr. {doctorName} {doctorSurname}
            </Badge>
          </Flex>
        </Flex>

        <Group gap="xs" style={{ flexShrink: 0 }}>
          <Tooltip label="Download PDF" position="top">
            <ActionIcon
              onClick={() => {
                downloadPdfMutation.mutate({ id, name, surname });
              }}
              variant="subtle"
              color="red"
              size="lg"
              radius="md"
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: "var(--mantine-color-red-1)",
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <IconFileTypePdf size={24} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Send" position="top">
            <ActionIcon
              onClick={() => {
                setName(name);
                setSurname(surname);
                setId(id);
                openModal();
              }}
              variant="subtle"
              color="blue"
              size="lg"
              radius="md"
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: "var(--mantine-color-blue-1)",
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <IconSend size={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Flex>
    </Paper>
  );
}
