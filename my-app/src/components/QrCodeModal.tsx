import { Button, Center, Text, Image, Modal, Stack } from "@mantine/core";
import { useQrContext } from "../context/QrContext";
import { IconQrcode, IconX } from "@tabler/icons-react";
import { CustomTitle } from "./CustomTitle";

export default function QrCodeModal() {
  const { qrCode, openedQr, closeQr, openCode } = useQrContext();
  return (
    <Modal
      opened={openedQr}
      onClose={closeQr}
      withinPortal={false}
      withCloseButton={false}
      closeButtonProps={{
        icon: <IconX size={20} color="red"></IconX>,
      }}
      title={
        <CustomTitle
          title="Scan the Qr code"
          icon={<IconQrcode size={24}></IconQrcode>}
        ></CustomTitle>
      }
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

//todo ci sta questo componente e un altro  in fase di registrazion 2fa molto simili si potrebbe trovare un modo per non farne due ma solo uno , sarebbe sicuramente piu efficiente.
//ora no da fare successivamente in fase di refactoring non dovrebbe essere molto difficile
