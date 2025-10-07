import {
  ActionIcon,
  Badge,
  Box,
  Divider,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { IconBell, IconBellOff, IconMail } from "@tabler/icons-react";
import { CommunicationStatusEnum } from "../types/CommunicationStatus.enum";
import { useNavigate } from "react-router-dom";
import useGetCommunication from "../hook/useGetCommunication";
import { CommunicationTypeEnum } from "../types/CommunicationType.enum";

interface NotificationProps {
  setSidebarActive: React.Dispatch<React.SetStateAction<number>>;
}

export function NotificationComponent({ setSidebarActive }: NotificationProps) {
  const navigate = useNavigate();
  const { data } = useGetCommunication(CommunicationTypeEnum.INCOMING, 1);

  return (
    <Menu shadow="md" width={300}>
      <Menu.Target>
        <Box pos="relative" ml="auto">
          <ActionIcon variant="subtle" c="black" size="md" mr="sm">
            <IconBell size={20} />
          </ActionIcon>
          {(data?.comunications?.filter(
            (row) => row.status === CommunicationStatusEnum.PENDING
          ).length ?? 0) > 0 && (
            <Badge
              size="xs"
              variant="filled"
              color="red"
              pos="absolute"
              top={-4}
              right={-4}
              w={18}
              h={18}
              p={0}
              style={{
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                fontSize: "10px",
              }}
            >
              {
                data?.comunications.filter(
                  (row) => row.status === CommunicationStatusEnum.PENDING
                ).length
              }
            </Badge>
          )}
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Group justify="space-between">
            <Text size="sm" fw={600}>
              Notifications
            </Text>
            {(data?.comunications?.filter(
              (row) => row.status === CommunicationStatusEnum.PENDING
            ).length ?? 0) > 0 && (
              <Badge size="sm" variant="light" color="blue">
                {
                  data?.comunications.filter(
                    (row) => row.status === CommunicationStatusEnum.PENDING
                  ).length
                }
              </Badge>
            )}
          </Group>
        </Menu.Label>

        <Divider my="xs" />

        {data?.comunications?.filter(
          (row) => row.status === CommunicationStatusEnum.PENDING
        ).length === 0 ? (
          <Box p="lg" ta="center">
            <IconBellOff
              size={40}
              color="gray"
              style={{ opacity: 0.5, margin: "0 auto" }}
            />
            <Text size="sm" c="dimmed" mt="sm">
              No Notifications yet
            </Text>
          </Box>
        ) : (
          <>
            {data?.comunications
              .filter((row) => row.status === CommunicationStatusEnum.PENDING)
              .map((row, index) => (
                <Menu.Item
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setSidebarActive(2);
                    setTimeout(() => navigate("comunication-history"), 0);
                  }}
                  leftSection={<IconMail size={18} />}
                >
                  <Box>
                    <Text size="sm" fw={500}>
                      New communication
                    </Text>
                    <Text size="xs" c="dimmed" mt={2}>
                      from {row.hospital}
                    </Text>
                  </Box>
                </Menu.Item>
              ))}

            <Divider my="xs" />

            <Menu.Item
              onClick={(e) => {
                e.preventDefault();
                setSidebarActive(2);
                setTimeout(() => navigate("comunication-history"), 0);
              }}
              c="blue"
              ta="center"
            >
              <Text size="sm" fw={500}>
                See all communications
              </Text>
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
