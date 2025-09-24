import { useMutation } from "@tanstack/react-query";
import type { EhrRequest } from "../types/EhrRequest";
import { createEhrApi } from "../api/createEhrApi";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export default function useCreateEhr() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (request: EhrRequest) => {
      const res = await createEhrApi(request);
      navigate("/Medtrust");
      console.log("Ehr creation success", res);
    },

    onSuccess: () => {
      notifications.show({
        title: "Success!",
        color: "Green",
        message: "Ehr created!",
        autoClose: 3500,
        position: "bottom-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "it was no possible to create the ehr!",
        autoClose: 3500,
        position: "bottom-right",
      });
    },
  });
}
