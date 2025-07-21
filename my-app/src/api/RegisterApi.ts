import api from "./axios"
import type { RegisterRequest } from "../types/RegisterRequest.type";
import type { RegisterResponse } from "../types/RegisterResponse";

export async function registerApi(data: RegisterRequest): Promise<RegisterResponse>{
    const response = await api.post<RegisterResponse>("/auth/signup",data);
    return response.data;
}