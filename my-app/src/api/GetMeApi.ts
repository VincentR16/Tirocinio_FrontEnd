import type { User } from "../types/User.type"
import axios from "./Axios"

export async function getMeApi(): Promise<User>{
    const response = await axios.get<User>("user/me")
    return response.data;
}