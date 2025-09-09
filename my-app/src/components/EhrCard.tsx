import { ActionIcon, Flex, Group, Paper, Text } from "@mantine/core";
import {
  IconClipboardText,
  IconEdit,
  IconExternalLink,
  IconFileTypePdf,
} from "@tabler/icons-react";
//qui bisogna aggiungere le props per far si che si abbiam nome email e data di creazione corretta
export function EhrCard() {
  return (
    <Paper
      h="70px"
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

          <Flex direction="column" ml="lg">
            <Text size="sm" fw={400}>
              Patient Name
            </Text>
            <Text size="xs" c="dimmed">
              Mario Rossi
            </Text>
          </Flex>

          <Flex direction="column" ml="lg">
            <Text size="sm" fw={400}>
              Email
            </Text>
            <Text size="xs" c="dimmed">
              MarioRossi@gmail.com
            </Text>
          </Flex>

          <Flex direction="column" ml="lg">
            <Text size="sm" fw={400}>
              Created at
            </Text>
            <Text size="xs" c="dimmed">
              16/08/2020
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
