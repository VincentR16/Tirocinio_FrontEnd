import api from "./axios";

export async function pdfApi(id: string) {
  const response = await api.get(`ehr/${id}/pdf`, {
    responseType: "blob",
  });
  return response.data;
}
