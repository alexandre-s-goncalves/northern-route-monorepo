import { describe, test, expect, vi, beforeEach } from 'vitest';
import { apiClient } from 'infrastructure/api/apiClient';
import { type ApiResult, type LoginRequest, type LoginResponse } from 'infrastructure/index';
import { loginUser } from './login.service';


vi.mock('infrastructure/api/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

describe('Services - LoginService Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('WHEN credentials are valid SHOULD return successful ApiResult with data', async () => {
    const mockRequest: LoginRequest = {
      email: 'driver@test.com',
      passwordHash: 'Secure123',
    };

    const mockResponse: ApiResult<LoginResponse> = {
      isSuccess: true,
      errorMessage: null,
      data: {
        userId: 'id-123',
        name: 'Alexandre Santos',
        email: 'driver@test.com',
        role: 'DRIVER',
        token: 'mocked-jwt-token',
      },
    };

    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockResponse });

    const result = await loginUser(mockRequest);

    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/login', mockRequest);
    expect(result.isSuccess).toBe(true);
    expect(result.data?.token).toBe('mocked-jwt-token');
  });

  test('WHEN server returns 400 error SHOULD return failed ApiResult from response', async () => {
    const mockRequest: LoginRequest = {
      email: 'wrong@test.com',
      passwordHash: 'wrong',
    };

    const mockErrorResponse: ApiResult<LoginResponse> = {
      isSuccess: false,
      errorMessage: 'Invalid credentials.',
      data: null,
    };

    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockErrorResponse });

    const result = await loginUser(mockRequest);

    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe('Invalid credentials.');
    expect(result.data).toBeNull();
  });
});
