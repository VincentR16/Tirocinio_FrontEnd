import { useMutation } from "@tanstack/react-query";
import { sendEhrApi } from "../api/sendEhrApi";
import { notifications } from "@mantine/notifications";
import { Button, Text, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function useSendEhr() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: { id: string; hospital: string }) => {
      const result = await sendEhrApi(data.id, data.hospital);
      return result;
    },
    onSuccess: () => {
      notifications.show({
        title: "EHR sent successfully!",
        color: "green",
        autoClose: 4000,
        position: "bottom-right",
        message: (
          <Stack justify="space-between">
            <Text>The EHR has been delivered! Click below to check the comunication History</Text>
            <Button
              size="xs"
              variant="light"
              onClick={() => {
                navigate("comunication-history")
              }}
            >
              History
            </Button>
          </Stack>
        ),
      });
    },
    onError: (error) => {
      console.error("❌ comunication failed:", error.message);

      notifications.show({
        title: "Comunication Failed!",
        color: "red",
        message: "Unable to send the EHR. Please try again later.",
        autoClose: 5000,
        position: "bottom-right",
      });
    },
  });
}
