import { describe, test, expect, vi } from 'vitest';
import { webRoutes } from './webRoutes';
import { RoutePaths } from 'resources/enum';
import React from 'react';

vi.mock('pages/Login/Login', () => ({
  Login: () => <div data-testid="login-page">Login Page</div>
}));

vi.mock('pages/Home/Home', () => ({
  Home: () => <div data-testid="home-page">Home Page</div>
}));

vi.mock('routes/protectedRoute', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="protected-wrapper">{children}</div>
  )
}));

describe('Routes - WebRoutes Configuration', () => {
  test('SHOULD have the correct login route configuration', () => {
    const loginRoute = webRoutes.routes.find(r => r.path === RoutePaths.LOGIN);
    expect(loginRoute).toBeDefined();
    
    const element = loginRoute?.element as React.ReactElement;
    const component = element.type as { name?: string };
    expect(component.name).toBe('Login');
  });

  test('SHOULD have the correct home route configuration with protection', () => {
    const homeRoute = webRoutes.routes.find(r => r.path === RoutePaths.HOME);
    expect(homeRoute).toBeDefined();
    
    const element = homeRoute?.element as React.ReactElement;
    const component = element.type as { name?: string };
    expect(component.name).toBe('ProtectedRoute');

    const props = element.props as { children?: React.ReactElement };
    const childComponent = props.children?.type as { name?: string };
    expect(childComponent.name).toBe('Home');
  });

  test('SHOULD have a wildcard route that redirects to login', () => {
    const anyRoute = webRoutes.routes.find(r => r.path === RoutePaths.ANY);
    expect(anyRoute).toBeDefined();
    
    const element = anyRoute?.element as React.ReactElement;
    const component = element.type as { name?: string };
    expect(component.name).toBe('Navigate');

    const props = element.props as { to?: string };
    expect(props.to).toBe(RoutePaths.LOGIN);
  });
});
