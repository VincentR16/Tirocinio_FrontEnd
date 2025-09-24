import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Loader,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { EhrCard } from "./EhrCard";
import type { PaginatedResponse } from "../types/PaginatedEhr.type";
import { IconFileText, IconPlus } from "@tabler/icons-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { SidebarContext } from "../pages/RootLayout.page";

interface EhrListPorps {
  isLoading: boolean;
  error: Error | null;
  data: PaginatedResponse | undefined;
}

export function EhrList({ data, isLoading, error }: EhrListPorps) {
  const navigate = useNavigate();
    const { setSidebarActive } = useOutletContext<SidebarContext>();

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
        <Text mt="md"> Loading...</Text>
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
        <Text c="red">Error: {error.message}</Text>
      </Flex>
    );
  }

  if (data?.ehr.length === 0) {
    return (
      <Flex
        mih="66vh"
        w="100%"
        mt="lg"
        direction="column"
        align="center"
        justify="center"
        px="md"
        pos="relative"
      >
        <Box
          pos="absolute"
          top={-20}
          right={-20}
          w={150}
          h={150}
          bg="blue.1"
          style={{
            borderRadius: "50%",
            opacity: 0.3,
            zIndex: -1,
          }}
        />

        <Box
          pos="absolute"
          bottom={-30}
          left={-30}
          w={120}
          h={120}
          bg="indigo.1"
          style={{
            borderRadius: "50%",
            opacity: 0.2,
            zIndex: -1,
          }}
        />
        <Paper
          shadow="sm"
          radius="xl"
          p="xl"
          maw={400}
          w="100%"
          bg="gradient-to-br"
          style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
            border: "1px solid #e0e7ff",
          }}
        >
          <Stack align="center" gap="lg">
            <Center>
              <ThemeIcon
                size={80}
                radius="xl"
                variant="gradient"
                gradient={{ from: "blue", to: "indigo", deg: 135 }}
              >
                <IconFileText size={40} />
              </ThemeIcon>
            </Center>

            <Stack align="center" gap="xs">
              <Text size="xl" fw={600} c="gray.8" ta="center">
                Nothing found
              </Text>

              <Text size="md" c="gray.6" ta="center" lh={1.5}>
                No electronic health records were found. Start by creating your
                first EHR.
              </Text>
            </Stack>

            <Button
              leftSection={<IconPlus size={18} />}
              variant="gradient"
              gradient={{ from: "blue", to: "indigo", deg: 135 }}
              size="md"
              radius="lg"
              fullWidth
              style={{
                boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.15)",
                transition: "all 200ms ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.25)",
                  },
                },
              }}
              onClick={() => {navigate("create-Ehr"); setSidebarActive(1)}}
            >
              Create new EHR
            </Button>

            <Box w="100%">
              <Divider color="blue.2" />
              <Text size="sm" c="gray.5" ta="center" mt="md">
                💡 Tip: Click the button{" "}
                <Text
                  span
                  fw={500}
                  c="blue.6"
                  style={{
                    backgroundColor: "#dbeafe",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  +
                </Text>{" "}
                to quickly create a new record
              </Text>
            </Box>
          </Stack>
        </Paper>
      </Flex>
    );
  }

  return (
    <Flex
      mih="72vh"
      w="100%"
      miw="100%"
      mt="lg"
      direction="column"
      align="center"
      gap="lg"
    >
      {data?.ehr.map((ehr) => (
        <EhrCard
          key={ehr.id}
          ehr={ehr}
          id={ehr.id}
          name={
            ehr.patient?.name?.[0]?.given?.[0]?.toString() ||
            "Nome non disponibile"
          }
          surname={
            ehr.patient?.name?.[0]?.family?.toString() || "Nome non disponibile"
          }
          email={ehr.patientEmail}
          date={ehr.createdAt.toString()}
          doctorName={ehr.createdBy.user.name}
          doctorSurname={ehr.createdBy.user.surname}
        />
      ))}
    </Flex>
  );
}
