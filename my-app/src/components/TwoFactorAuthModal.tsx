import {
  Button,
  Center,
  Divider,
  Modal,
  PinInput,
  Stack,
  Text,
} from "@mantine/core";
import { useQrContext } from "../context/QrContext";
import { useState } from "react";
import useTwoFactorAuth from "../hook/useTwoFactorAuth";
import { useAuthContext } from "../context/AuthContext";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export default function TwofactorAuthModal() {
  const { closeCode, openedCode } = useQrContext();
  const twoFactorAuth = useTwoFactorAuth();
  const { user } = useAuthContext();
  const [twoFactorAuthenticationCode, setCode] = useState("");
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <Modal
      opened={openedCode}
      onClose={closeCode}
      withinPortal={false}
      size="auto"
      p={0}
      withCloseButton={false}
      title={
        <Center>
          <Text size="lg" fw={700} ta="center" w="100%">
            Two Factor Authentication
          </Text>
        </Center>
      }
    >
      <Divider></Divider>
      <Stack>
        <Center p="xl">
          <PinInput
            value={twoFactorAuthenticationCode}
            onChange={setCode}
            size="xl"
            length={6}
            type="number"
            error = {isError}
          />
        </Center>
        <Button
          onClick={() => {
            twoFactorAuth.mutate(
              { userId: user!.id, twoFactorAuthenticationCode },
              {
                onSuccess: () => {
                  setIsError(false);
                  notifications.show({
                    title: "Welcome back!",
                    message: "You're now logged in.",
                    icon: <IconCheck size={18} />,
                    loading: false,
                    autoClose: 3500,
                    position: "top-right"
                  });
                },
                onError: () => {
                  notifications.show({
                    color: "red",
                    title: "Two factor Authentication",
                    message: "Pin is not valid, try again!",
                    autoClose: 3500
                  });
                  setIsError(true)
                },
              }
            );
          }}
        >
          Confirm
        </Button>
      </Stack>
    </Modal>
  );
}
