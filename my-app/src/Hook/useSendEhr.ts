import { useMutation } from "@tanstack/react-query";
import { sendEhrApi } from "../api/sendEhrApi";
import { notifications } from "@mantine/notifications";

export default function useSendEhr() {
  return useMutation({
    mutationFn: async (data: {id:string, hospital: string}) => {
      const result = await sendEhrApi(data.id,data.hospital);
      return result;
    },
    onSuccess: () => {
      notifications.show({
        title: "Ehr sent successfully!",
        color: "green",
        message: "The EHR has been delivered! check out all your comunications",
        autoClose: 4000,
        position: "bottom-right",
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
