import {
  Button,
  Center,
  Divider,
  Modal,
  PinInput,
  Stack,
  Text,
} from "@mantine/core";
import { useWelcomeContext } from "../context/WelcomeContext";
import { useState } from "react";
import useTwoFactorAuth from "../hook/useTwoFactorAuth";
import { useAuthContext } from "../context/AuthContext";

export default function TwofactorAuthModal() {
  const { closeCode, openedCode } = useWelcomeContext();
  const twoFactorAuth = useTwoFactorAuth();
  const { user } = useAuthContext();
  const [twoFactorAuthenticationCode, setCode] = useState("");

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
          />
        </Center>
        <Button
          onClick={() => {
            twoFactorAuth({ userId: user!.id, twoFactorAuthenticationCode });
          }}
        >
          Confirm
        </Button>
      </Stack>
    </Modal>
  );
}
