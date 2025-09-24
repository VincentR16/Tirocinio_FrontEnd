import {
  Button,
  Center,
  Text,
  Image,
  Modal,
  Stack,
  Title,
  ThemeIcon,
} from "@mantine/core";
import { useQrContext } from "../context/QrContext";
import { IconQrcode, IconX } from "@tabler/icons-react";
import { Group } from "lucide-react";

export default function QrCodeModal() {
  const { qrCode, openedQr, closeQr, openCode } = useQrContext();
  return (
    <Modal
      opened={openedQr}
      onClose={closeQr}
      withinPortal={false}
      withCloseButton={false}
       closeButtonProps={{
              icon: <IconX size={20} color="red" ></IconX>
            }}
      title={
        <Group>
          <ThemeIcon
            size="lg"
            radius="md"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            <IconQrcode size={20} />
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
            Scan Qr Code
          </Title>
        </Group>
      }
      size="auto"
      closeOnClickOutside={false}
    >
      <Stack>
        <Center>
          <Text mt="xs" p="xs" size="xl" fw={600} ta="center" w="100%">
            Scan the QrCode with GoogleAuthenticator
          </Text>
        </Center>
        <Center>
          <Image w={350} p="lg" fit="contain" src={qrCode}></Image>
        </Center>
        <Button
          onClick={() => {
            closeQr();
            openCode();
          }}
        >
          Continue
        </Button>
      </Stack>
    </Modal>
  );
}

//todo ci sta questoe  2fa molto simili si potrebbe trovare un modo per non farne due ma solo uno , sarebbe sicuramente piu efficiente.
//ora no da fare successivamente in fase di refactoring non dovrebbe essere molto difficile