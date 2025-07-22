import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../api/registerApi';
import { useAuthContext } from '../context/AuthContext';
import type { RegisterRequest } from '../types/RegisterRequest.type';
import type { RegisterResponse } from '../types/RegisterResponse';

export default function useRegister() {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: async (request: RegisterRequest): Promise<string> => {
      const res: RegisterResponse = await registerApi(request);
      setUser(res.user);
      console.log('Register success', res);
      return res.qrCodeUrl;
    },

    onError: (error) => {
      console.error('Register error', error);
    },
  });
}

