import { useMutation } from "@tanstack/react-query";
import { pdfApi } from "../api/pdfApi";
import { notifications } from "@mantine/notifications";

export default function usePdf() {
  return useMutation({
    mutationFn: async (id: string) => {
      const blob = await pdfApi(id);
      return blob;
    },
    onSuccess: (blob: Blob, id: string) => {
      
      // Download automatico
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ehr-${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      notifications.show({
        title: "Download Successful!",
        color: "green",
        message: "The EHR PDF has been downloaded successfully.",
        autoClose: 4000,
        position: "bottom-right",
      });
    },
    onError: (error) => {
      console.error("❌ PDF download failed:", error.message);
      
      notifications.show({
        title: "Download Failed!",
        color: "red",
        message: "Unable to download the EHR PDF. Please try again later.",
        autoClose: 5000,
        position: "bottom-right",
      });
    }
  });
}
