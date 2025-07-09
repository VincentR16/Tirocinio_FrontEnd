import axios from "../Axios"
import type { RegisterRequest } from "../types/RegisterRequest.type";

export function registerApi(data: RegisterRequest){
    const response = axios.post("/auth/signup",data);
    return response;
}