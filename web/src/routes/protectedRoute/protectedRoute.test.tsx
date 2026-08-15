import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RoutePaths } from 'resources/enum';
import { ProtectedRoute } from './protectedRoute';

describe('Routes - ProtectedRoute Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('WHEN token is missing SHOULD redirect to login page', () => {
    render(
      <MemoryRouter initialEntries={[RoutePaths.HOME]}>
        <Routes>
          <Route
            path={RoutePaths.HOME}
            element={
              <ProtectedRoute>
                <div data-testid="private-content">Private Content</div>
              </ProtectedRoute>
            }
          />
          <Route 
            path={RoutePaths.LOGIN} 
            element={<div data-testid="login-page">Login Page</div>} 
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('private-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  test('WHEN token is present SHOULD render children components', () => {
    localStorage.setItem('@NorthernRoute:token', 'valid-token');

    render(
      <MemoryRouter initialEntries={[RoutePaths.HOME]}>
        <Routes>
          <Route
            path={RoutePaths.HOME}
            element={
              <ProtectedRoute>
                <div data-testid="private-content">Private Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('private-content')).toBeInTheDocument();
  });
});
