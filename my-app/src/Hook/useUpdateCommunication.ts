import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommunicationApi } from "../api/updateCommunicationApi";
import type { CommunicationStatus } from "../types/CommunicationStatus.enum";
import { notifications } from "@mantine/notifications";

export default function useUpdateCommunication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; status: CommunicationStatus }) => {
      const response = await updateCommunicationApi(data.id, data.status);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communications"] });
      notifications.show({
        title: "Communication updated successfully!",
        color: "green",
        autoClose: 4000,
        position: "bottom-right",
        message: "EHR added to your records.",
      });
    },
    onError: (error) => {
      console.error("❌ comunication failed:", error.message);

      notifications.show({
        title: "Comunication update Failed!",
        color: "red",
        message: "Unable to update the Communication. Please try again later.",
        autoClose: 5000,
        position: "bottom-right",
      });
    },
  });
}
