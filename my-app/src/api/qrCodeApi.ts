import api from "./axios";

export async function qrCodeApi(){
    const response = await api.get("/auth/QRcode")
    return response.data;
}