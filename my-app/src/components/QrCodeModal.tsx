import { Button, Center, Text, Image, Modal, Stack } from "@mantine/core";
import { useQrContext } from "../context/QrContext";

export default function QrCodeModal() {
  const { qrCode, openedQr, closeQr, openCode } = useQrContext();
  return (
    <Modal
      opened={openedQr}
      onClose={closeQr}
      withinPortal={false}
      withCloseButton={false}
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
