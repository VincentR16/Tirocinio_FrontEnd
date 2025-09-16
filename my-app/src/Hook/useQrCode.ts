import { useMutation } from "@tanstack/react-query";
import { qrCodeApi } from "../api/qrCodeApi";
import { notifications } from "@mantine/notifications";

export default function useQrCode() {
  return useMutation({
    mutationFn: async () => {
      const url = await qrCodeApi();
      return url;
    },
    onSuccess: () => {
      notifications.show({
        title: "Qr code generated successfuly!",
        color: "green",
        message: "Scan the qrCode",
        autoClose: 4000,
        position: "bottom-right",
      });
    },
    onError: (error) => {
      console.error("❌ PDF download failed:", error.message);

      notifications.show({
        title: "Generation Failed!",
        color: "red",
        message: "Unable to generate the QrCode. Please try again later.",
        autoClose: 5000,
        position: "bottom-right",
      });
    },
  });
}
