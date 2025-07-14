import api from "./axios"
import type { RegisterRequest } from "../types/RegisterRequest.type";

export async function registerApi(data: RegisterRequest){
    const response = await api.post("/auth/signup",data);
    return response;
}