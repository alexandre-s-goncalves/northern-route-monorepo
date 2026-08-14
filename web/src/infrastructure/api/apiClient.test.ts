import { describe, test, expect } from 'vitest';
import { apiClient } from './apiClient';

describe('Infrastructure - ApiClient Integration Tests', () => {
  test('WHEN initialized SHOULD match environment configuration base URL', () => {
    expect(apiClient.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
  });

  test('WHEN configured SHOULD enforce application/json as default Content-Type header', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  test('WHEN request interceptor encounters rejection SHOULD reject promise with original error', async () => {
    const interceptorContainer = apiClient.interceptors.request as any;
    const rejectHandler = interceptorContainer.handlers[0].rejected;

    const fakeError = new Error('Network Simulation Failure');
    
    await expect(rejectHandler(fakeError)).rejects.toThrow('Network Simulation Failure');
  });
});
