import {
  Blockquote,
  Button,
  Center,
  Flex,
  Modal,
  Paper,
  Image,
  Text,
  Stack,
  Group,
  ThemeIcon,
  Title,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconQrcode } from "@tabler/icons-react";
import useQrCode from "../hook/useQrCode";

export default function TwoFactorAuthPage() {
  const icon = <IconInfoCircle />;
  const [opened, { toggle }] = useDisclosure(false);
  const { mutate: generateQrCode, data: url } = useQrCode();
  return (
    <Flex direction="column" gap="md" miw="100%">
      <Paper mt="xl" shadow="md" radius="lg">
        <Box p="xs">
          <Blockquote radius="lg" color="indigo" icon={icon}>
            Here you can register your device with the authenticator app to
            enable two-factor authentication for enhanced security.
            <br />
            <strong>Setup Instructions:</strong>
            <br />
            <br />
            1. <strong>Download an authenticator app</strong> on your mobile
            device:
            <br />
            • Google Authenticator (iOS/Android)
            <br />
            • Microsoft Authenticator (iOS/Android)
            <br />
            • Authy (iOS/Android)
            <br />
            • Any TOTP-compatible app
            <br />
            <br />
            2. <strong>Open the authenticator app</strong> and tap the "+" or
            "Add account" button
            <br />
            <br />
            3. <strong>Select "Scan QR code"</strong> or "Scan barcode" option
            in your authenticator app
            <br />
            <br />
            4. <strong>Point your phone's camera</strong> at the QR code
            displayed on this screen
            <br />
            <br />
            5. <strong>Wait for the app to scan</strong> and automatically add
            your account
            <br />
            <br />
            <strong>Note:</strong> Keep your authenticator app installed and
            accessible, as you'll need it to log in from now on.
            <br />
            <br />
          </Blockquote>
        </Box>

        <Center p="md">
          <Button
            size="compact-xl"
            leftSection={<IconQrcode size={16} />}
            onClick={() => {
              toggle();
              generateQrCode();
            }}
          >
            Generate QrCode
          </Button>
        </Center>
      </Paper>

      <Modal
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
        p="xl"
        mr="xl"
        opened={opened}
        onClose={toggle}
        withinPortal={false}
        size="md"
        style={{
          marginLeft: "-7rem",
        }}
        centered
      >
        <Stack align="center" gap="md">
          <Text size="sm" ta="center" c="dimmed">
            Scan this QR code with your authenticator app
          </Text>

          <Center>
            <Image
              src={url}
              alt="QR Code for 2FA setup"
              w={250}
              h={250}
              radius="md"
              fallbackSrc="https://via.placeholder.com/250x250/gray/white?text=Loading..."
            />
          </Center>
        </Stack>
      </Modal>
    </Flex>
  );
}
