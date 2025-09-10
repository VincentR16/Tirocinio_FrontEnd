import { ActionIcon, Divider, Flex, Group, Paper, Text } from "@mantine/core";
import {
  IconClipboardText,
  IconEdit,
  IconExternalLink,
  IconFileTypePdf,
} from "@tabler/icons-react";

interface EhrCardProps {
  email: string;
  name: string;
  surname: string;
  date: string;
  doctorName: string;
  doctorSurname: string
}

export function EhrCard({ email, name, surname, date, doctorName,doctorSurname }: EhrCardProps) {
  return (
    <Paper
      mt="5px"
      h="80px"
      shadow="xs"
      withBorder
      p="md"
      radius="md"
      style={{ width: "100%", maxWidth: "1200px" }}
    >
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        w="100%"
        h="100%"
      >
        <Flex direction="row" align="center" gap="md">
          <IconClipboardText
            color="var(--mantine-color-blue-filled)"
            strokeWidth={1.5}
            size="32px"
          />

          <Divider orientation="vertical"></Divider>

          <Flex direction="column" ml="xl">
            <Text size="sm" fw={400}>
              Patient Name
            </Text>
            <Text miw="125px" maw="125px" size="xs" c="dimmed">
              {name} {surname}
            </Text>
          </Flex>

          <Flex direction="column" ml="xl">
            <Text size="sm" fw={400}>
              Email
            </Text>
            <Text miw="150px" maw="150px" size="xs" c="dimmed">
              {email}
            </Text>
          </Flex>

          <Flex direction="column" ml="xl">
            <Text size="sm" fw={400}>
              Created at:
            </Text>
            <Text size="xs" c="dimmed">
              {date}
            </Text>
          </Flex>

          <Flex direction="column" ml="xl">
            <Text size="sm" fw={400}>
              Created by:
            </Text>
            <Text size="xs" c="dimmed">
              {doctorName} {doctorSurname}
            </Text>
          </Flex>

        </Flex>

        <Group gap="xs">
          <ActionIcon variant="subtle" color="red" size="lg" radius="md">
            <IconFileTypePdf size={22} />
          </ActionIcon>

          <ActionIcon variant="subtle" color="blue" size="lg" radius="md">
            <IconExternalLink size={22} />
          </ActionIcon>

          <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
            <IconEdit size={22} />
          </ActionIcon>
        </Group>
      </Flex>
    </Paper>
  );
}
