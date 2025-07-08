import type { LoginRequest } from "../types/LoginRequest.types";
import axios from "axios"

export function loginApi(data: LoginRequest){
    const response = axios.post("",data);
    return response;
}