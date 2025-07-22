import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import type { TwoFactorRequest } from '../types/TwoFactorRequest';
import { twoFactorAuthApi } from '../api/twoFactorAuthApi';
import { useAuthContext } from '../context/AuthContext';

export default function useTwoFactorAuth() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  return useMutation({
    mutationFn: async (request: TwoFactorRequest): Promise<"success" | "invalid" | "error"> => {
      try {
        const res = await twoFactorAuthApi(request);
        setIsAuthenticated(true);
        navigate('/home');
        console.log('User Authenticated!', res);
        return 'success';
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response?.status === 401) {
            console.warn('Invalid 2FA code');
            return 'invalid';
          }
          console.error('Unexpected error:', err.response?.data?.message || err.message);
        } else {
          console.error('Unknown error:', err);
        }
        return 'error';
      }
    },
  });
}
