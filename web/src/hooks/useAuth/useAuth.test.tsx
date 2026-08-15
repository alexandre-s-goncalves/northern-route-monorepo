import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ApiResult, LoginRequest, LoginResponse } from 'infrastructure/index';
import React from 'react';
import { useLoginMutation } from './useAuth.ts';
import { loginUser } from 'services/login';

vi.mock('services/login', () => ({
  loginUser: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Hooks - useAuth Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('WHEN invocation is successful SHOULD execute loginUser and save token into localStorage', async () => {
    const mockRequest: LoginRequest = {
      email: 'driver@northernroute.com',
      passwordHash: 'SecurePassword123',
    };

    const mockResponse: ApiResult<LoginResponse> = {
      isSuccess: true,
      errorMessage: null,
      data: {
        userId: 'id-123',
        name: 'Alexandre Santos',
        email: 'driver@northernroute.com',
        role: 'DRIVER',
        token: 'valid-jwt-token',
      },
    };

    vi.mocked(loginUser).mockImplementationOnce(() => Promise.resolve(mockResponse));

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockRequest);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(localStorage.getItem('@NorthernRoute:token')).toBe('valid-jwt-token');
  });

  test('WHEN invocation fails or returns no token SHOULD NOT store token into localStorage', async () => {
    const mockRequest: LoginRequest = {
      email: 'driver@northernroute.com',
      passwordHash: 'WrongPassword',
    };

    const mockFailedResponse: ApiResult<LoginResponse> = {
      isSuccess: false,
      errorMessage: 'Invalid credentials',
      data: null,
    };

    vi.mocked(loginUser).mockImplementationOnce(() => Promise.resolve(mockFailedResponse));

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockRequest);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(localStorage.getItem('@NorthernRoute:token')).toBeNull();
  });
});
