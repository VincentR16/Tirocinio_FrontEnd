import api from "./axios";

export async function sendEhrApi(Id: string, hospital: string) {
  const response = await api.post(`communication/${Id}/send`, {
    hospital: hospital,
  });
  return response.data;
}
