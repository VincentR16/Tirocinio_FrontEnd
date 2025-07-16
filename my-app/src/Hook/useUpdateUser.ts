import { getMeApi } from "../api/getMeApi";
import { updateUserApi } from "../api/updateUserApi";
import { useAuthContext } from "../context/AuthContext";
import type { UpdateUserRequest } from "../types/UpdateUserRequest.type";

export default function useUpdateUser() {
  const { setUser,setIsAuthenticated } = useAuthContext();

  return async (data: UpdateUserRequest) => {
    try {
      const res = await updateUserApi(data);

      const user = await getMeApi();
      setUser(user);
      setIsAuthenticated(true);

      console.log("Changed Applied", res);
    } catch (err) {
      console.error("Modify Error", err);
    }
  };
}
