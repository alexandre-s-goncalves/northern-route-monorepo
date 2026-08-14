import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { authInterceptor } from './authInterceptor';
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

describe('Infrastructure - AuthInterceptor Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('WHEN token EXISTS in localStorage SHOULD inject Bearer token into Authorization header', () => {
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    localStorage.setItem('@NorthernRoute:token', fakeToken);

    const mockHeaders = {} as AxiosRequestHeaders;
    const mockConfig = {
      headers: mockHeaders,
    } as InternalAxiosRequestConfig;

    const result = authInterceptor(mockConfig);

    expect(result.headers.Authorization).toBe(`Bearer ${fakeToken}`);
  });

  test('WHEN token DOES NOT EXIST in localStorage SHOULD NOT modify Authorization header', () => {
    const mockHeaders = {} as AxiosRequestHeaders;
    const mockConfig = {
      headers: mockHeaders,
    } as InternalAxiosRequestConfig;

    const result = authInterceptor(mockConfig);

    expect(result.headers.Authorization).toBeUndefined();
  });
});
