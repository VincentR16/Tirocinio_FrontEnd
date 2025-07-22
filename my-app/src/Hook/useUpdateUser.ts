import { useMutation } from "@tanstack/react-query";
import { updateUserApi } from "../api/updateUserApi";
import { getMeApi } from "../api/getMeApi";
import { useAuthContext } from "../context/AuthContext";
import type { UpdateUserRequest } from "../types/UpdateUserRequest.type";

export default function useUpdateUser() {
  const { setUser, setIsAuthenticated } = useAuthContext();

  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      await updateUserApi(data);
      const updatedUser = await getMeApi();
      return updatedUser;
    },
    onSuccess: (user) => {
      setUser(user);
      setIsAuthenticated(true);
      console.log("Changes applied");
    },
    onError: (error) => {
      console.error("Modify error", error);
    },
  });
}
