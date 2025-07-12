import axios from "./Axios"
import type { RegisterRequest } from "../types/RegisterRequest.type";

export async function registerApi(data: RegisterRequest){
    const response = await axios.post("/auth/signup",data);
    return response;
}