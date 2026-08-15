import React from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePaths } from 'resources/enum';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('@NorthernRoute:token');

  if (!token) {
    return <Navigate to={RoutePaths.LOGIN} replace />;
  }

  return <>{children}</>;
};

