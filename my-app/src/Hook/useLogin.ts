import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../api/loginApi';
import { useAuthContext } from '../context/AuthContext';
import type { LoginRequest } from '../types/LoginRequest.type';

export default function useLogin() {
  const { setUser,setLoading,setIsAuthenticated } = useAuthContext();

  return useMutation({
    mutationFn: (request: LoginRequest) => loginApi(request),

    onSuccess: (data) => {
      setLoading(false);
      setIsAuthenticated(true);
      setUser(data);
      console.log('Login success', data);
    },

    onError: (error) => {
      setIsAuthenticated(false); 
      setLoading(false); 
      console.error('Login error', error);
    },
  });
}
