import { useMutation } from '@tanstack/react-query';
import { loginUser } from 'services/login';
import type { ApiResult, LoginRequest, LoginResponse } from 'infrastructure/index';

export const useLoginMutation = () => {
  return useMutation<ApiResult<LoginResponse>, Error, LoginRequest>({
    mutationFn: async (payload: LoginRequest) => {
      try {
        const response = await loginUser(payload);
        if (response.isSuccess && response.data?.token) {
          localStorage.setItem('@NorthernRoute:token', response.data.token);
        }
        return response;
      } catch (error: unknown) {
        const axiosError = error as { response?: { data?: { errorMessage?: string } } };
        return {
          isSuccess: false,
          errorMessage: axiosError.response?.data?.errorMessage || 'Invalid credentials.',
          data: null,
        };
      }
    }
  });
};
