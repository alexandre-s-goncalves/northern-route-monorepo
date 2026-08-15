import { useMutation } from '@tanstack/react-query';
import type { ApiResult, LoginRequest, LoginResponse } from 'infrastructure/index';
import { loginUser } from 'services/login';

export const useLoginMutation = () => {
  return useMutation<ApiResult<LoginResponse>, Error, LoginRequest>({
    mutationFn: (payload: LoginRequest) => loginUser(payload),
    onSuccess: (response) => {
      if (response.isSuccess && response.data?.token) {
        localStorage.setItem('@NorthernRoute:token', response.data.token);
      }
    },
  });
};
