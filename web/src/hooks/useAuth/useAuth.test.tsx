import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loginUser } from 'services/login';
import React from 'react';
import type { ApiResult, LoginResponse } from 'infrastructure/index';
import { useLoginMutation } from './useAuth.ts';

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

  test('WHEN invocation is successful SHOULD store token AND return success', async () => {
    const mockResponse: ApiResult<LoginResponse> = {
      isSuccess: true,
      data: { 
        userId: '1', 
        name: 'Alexandre', 
        email: 'driver@test.com', 
        role: 'DRIVER', 
        token: 'valid-jwt-token' 
      },
      errorMessage: null,
    };

    vi.mocked(loginUser).mockResolvedValue(mockResponse as unknown as ApiResult<LoginResponse>);

    const { result } = renderHook(() => useLoginMutation(), { wrapper: createWrapper() });

    const response = await result.current.mutateAsync({ 
      email: 'driver@test.com', 
      passwordHash: 'Secure123' 
    });

    expect(response.isSuccess).toBe(true);
    expect(localStorage.getItem('@NorthernRoute:token')).toBe('valid-jwt-token');
  });

  test('WHEN API returns 400 error SHOULD catch and return errorMessage', async () => {
    const mockError = {
      response: { 
        data: { errorMessage: 'Invalid credentials.' } 
      }
    };

    vi.mocked(loginUser).mockRejectedValue(mockError);

    const { result } = renderHook(() => useLoginMutation(), { wrapper: createWrapper() });

    const response = await result.current.mutateAsync({ 
      email: 'driver@test.com', 
      passwordHash: 'WrongPass' 
    });

    expect(response.isSuccess).toBe(false);
    expect(response.errorMessage).toBe('Invalid credentials.');
  });

  test('WHEN invocation is successful BUT token is missing SHOULD NOT store anything', async () => {
    const mockResponse: ApiResult<LoginResponse> = {
      isSuccess: true,
      data: { userId: '', name: '', email: '', role: '', token: '' },
      errorMessage: null,
    };

    vi.mocked(loginUser).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLoginMutation(), { wrapper: createWrapper() });

    await result.current.mutateAsync({ email: 'a@a.com', passwordHash: '1' });

    expect(localStorage.getItem('@NorthernRoute:token')).toBeNull();
  });

  test('WHEN network error occurs WITHOUT response data SHOULD return default error message', async () => {
    vi.mocked(loginUser).mockRejectedValue(new Error('Network Failure'));

    const { result } = renderHook(() => useLoginMutation(), { wrapper: createWrapper() });

    const response = await result.current.mutateAsync({ email: 'a@a.com', passwordHash: '1' });

    expect(response.isSuccess).toBe(false);
    expect(response.errorMessage).toBe('Invalid credentials.');
  });
});
