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
import { IconFileText,IconX } from "@tabler/icons-react";

export default function SendModal() {
  const [hospital, setHospital] = useState("");
  const { opened, closeModal, id, name, surname } = useSendContext();

const ModalTitle = () => (
  <Group >
    <ThemeIcon size="lg" radius="md" variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
      <IconFileText size={20} />
    </ThemeIcon>
    <Title order={3} style={{
      background: 'linear-gradient(135deg, #228be6 0%, #15aabf 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 600
    }}>
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
        icon: <IconX size={20} color="red" ></IconX>
      }}
      title={<ModalTitle></ModalTitle>}
      size="md"
      p="xl"
    >
      <Stack p="md">
        <div>   
          <Stack >
            <Flex direction="row"  gap="sm">
              <Text fw={600} size="sm">
                Surname:
              </Text>
              <Text size="sm">{surname || "Non disponibile"}</Text>
            </Flex>
            <Flex direction="row" gap="sm" >
              <Text fw={600} size="sm">
                Name:
              </Text>
              <Text size="sm">{name || "Non disponibile"}</Text>
            </Flex>
            <Flex direction="row" gap="sm">
              <Text fw={600}  size="sm">
                Id:
              </Text>
              <Text size="sm">{id || "Non disponibile"}</Text>
            </Flex>
          </Stack>
        </div>

        <Divider />

        <div>
          <Title order={4} mb="sm">
            Destinazione
          </Title>
          <TextInput
            label="Nome Ospedale"
            placeholder="Inserisci il nome dell'ospedale"
            value={hospital}
            onChange={(event) => setHospital(event.currentTarget.value)}
            required
          />
        </div>

        <Flex justify="flex-end" gap="sm" mt="md">
          <Button variant="subtle" color="red" onClick={closeModal}>
            Annulla
          </Button>
          <Button disabled={!hospital.trim()}>
            Invia
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
