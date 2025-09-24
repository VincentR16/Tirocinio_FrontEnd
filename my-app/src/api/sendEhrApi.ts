import api from "./axios";

export async function sendEhrApi(Id: string, hospital: string) {
  const response = await api.post(`comunication/${Id}/send`, hospital);
  return response.data;
}
