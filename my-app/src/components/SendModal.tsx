import {
  Button,
  Text,
  Divider,
  Flex,
  Modal,
  Stack,
  TextInput,
  Title,
  Group,
  ThemeIcon,
} from "@mantine/core";
import { useSendContext } from "../context/SendContext";
import { useState } from "react";
import { IconFileText, IconX } from "@tabler/icons-react";
import useSendEhr from "../hook/useSendEhr";

export default function SendModal() {
  const [hospital, setHospital] = useState("");
  const { opened, closeModal, id, name, surname } = useSendContext();
  const handleSend = useSendEhr();

  const ModalTitle = () => (
    <Group>
      <ThemeIcon
        size="lg"
        radius="md"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan" }}
      >
        <IconFileText size={20} />
      </ThemeIcon>
      <Title
        order={3}
        style={{
          background: "linear-gradient(135deg, #228be6 0%, #15aabf 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 600,
        }}
      >
        Send EHR
      </Title>
    </Group>
  );

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      withinPortal={false}
      centered
      closeButtonProps={{
        icon: <IconX size={20} color="red"></IconX>,
      }}
      title={<ModalTitle></ModalTitle>}
      size="md"
    >
      <Stack p="md">
        <div>
          <Stack>
            <Flex direction="row" gap="sm">
              <Text fw={600} size="sm">
                Surname:
              </Text>
              <Text size="sm">{surname || "Non disponibile"}</Text>
            </Flex>
            <Flex direction="row" gap="sm">
              <Text fw={600} size="sm">
                Name:
              </Text>
              <Text size="sm">{name || "Non disponibile"}</Text>
            </Flex>
            <Flex direction="row" gap="sm">
              <Text fw={600} size="sm">
                Ehr Id:
              </Text>
              <Text size="sm">{id || "Non disponibile"}</Text>
            </Flex>
          </Stack>
        </div>

        <Divider />

        <div>
          <Title order={4} mb="sm"></Title>
          <TextInput
            label="Hospital name"
            placeholder="Insert the hospital name"
            value={hospital}
            onChange={(event) => setHospital(event.currentTarget.value)}
            required
          />
        </div>

        <Flex justify="flex-end" gap="sm" mt="md">
          <Button variant="subtle" color="red" onClick={closeModal}>
            Annulla
          </Button>
          <Button
            onClick={() => {
              handleSend.mutate({ id, hospital });
              closeModal();
              setHospital("");
            }}
            disabled={!hospital.trim()}
          >
            Send
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
