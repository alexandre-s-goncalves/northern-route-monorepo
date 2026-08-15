import { apiClient } from 'infrastructure/api/apiClient';
import { ApiResult, LoginRequest, LoginResponse } from 'infrastructure/index';

export const loginUser = async (
  payload: LoginRequest,
): Promise<ApiResult<LoginResponse>> => {
  const response = await apiClient.post<ApiResult<LoginResponse>>(
    '/api/auth/login',
    payload,
  );
  return response.data;
};
