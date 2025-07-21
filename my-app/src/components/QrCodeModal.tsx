import { Button, Center, Text, Image, Modal, Stack } from "@mantine/core";
import { useWelcomeContext } from "../context/WelcomeContext";

export default function QrCodeModal() {
  const { qrCode, openedQr, closeQr, openCode } = useWelcomeContext();
  return (
    <Modal
      opened={openedQr}
      onClose={closeQr}
      withinPortal={false}
      withCloseButton={false}
      size="auto"
      p={0}
      title={
        <Center>
          <Text size="lg" fw={700} ta="center" w="100%">
            Two Factor Authentication
          </Text>
        </Center>
      }
    >
      <Stack>
        <Center>
          <Text size="lg" fw={600} ta="center" w="100%">
            Scan thw QrCode with GoogleAuth
          </Text>
        </Center>
        <Center>
          <Image w="auto" fit="contain" src={qrCode}></Image>
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
