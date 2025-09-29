import { Button, Center, Divider, Modal, PinInput, Stack } from "@mantine/core";
import { useQrContext } from "../context/QrContext";
import { useState } from "react";
import useTwoFactorAuth from "../hook/useTwoFactorAuth";
import { useAuthContext } from "../context/AuthContext";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconQrcode, IconX } from "@tabler/icons-react";
import { CustomTitle } from "./CustomTitle";

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
        <CustomTitle
          title="Two factor authentication"
          icon={<IconQrcode size={24}></IconQrcode>}
        ></CustomTitle>
      }
      closeButtonProps={{
        icon: <IconX size={20} color="red"></IconX>,
      }}
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
            error={isError}
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
                    position: "top-right",
                  });
                },
                onError: () => {
                  notifications.show({
                    color: "red",
                    title: "Two factor Authentication",
                    message: "Pin is not valid, try again!",
                    autoClose: 3500,
                  });
                  setIsError(true);
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
