import api from "./axios"
import type { UpdateUserRequest } from "../types/UpdateUserRequest.type";

export async function updateUserApi(data: UpdateUserRequest){
    const response = await api.patch("/user/me",data);
    return response;
}